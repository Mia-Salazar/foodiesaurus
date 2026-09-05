import "dotenv/config";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const sqlPath = path.join(process.cwd(), "legacy", "db.sql");
const sql = fs.readFileSync(sqlPath, "utf-8");

// Extrae el bloque INSERT INTO "tabla" (...) VALUES (...);
// Robustecido: localiza el bloque VALUES completo hasta el ; que cierra el INSERT,
// tolerando comentarios largos con puntos, comillas escapadas ('') y saltos de línea.
function extractInserts(tableName: string): string[][] {
  const rows: string[][] = [];
  const startRegex = new RegExp(`INSERT INTO "${tableName}"\\s*\\([^)]*\\)\\s*VALUES`, "g");
  let startMatch;
  while ((startMatch = startRegex.exec(sql)) !== null) {
    const blockStart = startMatch.index + startMatch[0].length;
    // Escanea carácter a carácter para encontrar el ; que cierra el INSERT
    // respetando comillas simples (incluyendo '' escapadas) y paréntesis anidados.
    let i = blockStart;
    let depth = 0;
    let inString = false;
    let blockEnd = -1;
    while (i < sql.length) {
      const c = sql[i];
      if (inString) {
        if (c === "'") {
          if (sql[i + 1] === "'") {
            i += 2;
            continue;
          }
          inString = false;
        }
      } else {
        if (c === "'") inString = true;
        else if (c === "(") depth++;
        else if (c === ")") depth--;
        else if (c === ";" && depth === 0) {
          blockEnd = i;
          break;
        }
      }
      i++;
    }
    if (blockEnd === -1) continue;
    const valuesBlock = sql.slice(blockStart, blockEnd);

    // Ahora separa cada tupla (...) de nivel superior, respetando comillas.
    let j = 0;
    while (j < valuesBlock.length) {
      if (valuesBlock[j] === "(") {
        let d = 1;
        let k = j + 1;
        let inStr = false;
        while (k < valuesBlock.length && d > 0) {
          const c = valuesBlock[k];
          if (inStr) {
            if (c === "'") {
              if (valuesBlock[k + 1] === "'") {
                k += 2;
                continue;
              }
              inStr = false;
            }
          } else {
            if (c === "'") inStr = true;
            else if (c === "(") d++;
            else if (c === ")") d--;
          }
          k++;
        }
        const tupleContent = valuesBlock.slice(j + 1, k - 1);
        rows.push(splitFields(tupleContent));
        j = k;
      } else {
        j++;
      }
    }
  }
  return rows;
}

// Divide los campos de una tupla respetando comillas simples y comas escapadas
function splitFields(tupleContent: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inStr = false;
  let i = 0;
  while (i < tupleContent.length) {
    const c = tupleContent[i];
    if (inStr) {
      if (c === "'" && tupleContent[i + 1] === "'") {
        current += "'";
        i += 2;
        continue;
      }
      if (c === "'") {
        inStr = false;
        current += c;
        i++;
        continue;
      }
      current += c;
      i++;
    } else {
      if (c === "'") {
        inStr = true;
        current += c;
        i++;
        continue;
      }
      if (c === ",") {
        fields.push(current.trim());
        current = "";
        i++;
        continue;
      }
      current += c;
      i++;
    }
  }
  fields.push(current.trim());
  return fields;
}

function cleanStr(v: string | undefined): string | null {
  if (v === undefined || v === "NULL" || v === "") return null;
  return v.replace(/^'/, "").replace(/'$/, "").replace(/''/g, "'");
}

function cleanNum(v: string | undefined): number | null {
  const c = cleanStr(v);
  if (c === null || c === "") return null;
  const n = Number(c);
  return Number.isNaN(n) ? null : n;
}

// Trunca de forma segura para respetar límites VARCHAR y evitar P2000
function truncate(v: string | null, max: number): string | null {
  if (v === null) return null;
  return v.length > max ? v.slice(0, max) : v;
}

async function main() {
  const restaurantRows = extractInserts("restaurant");
  const scoreRows = extractInserts("scores");

  console.log(`Restaurantes encontrados: ${restaurantRows.length}`);
  console.log(`Scores encontrados: ${scoreRows.length}`);

  const seenRestaurantIds = new Set<number>();
  const uniqueRestaurants = restaurantRows.filter((r) => {
    const id = cleanNum(r[0])!;
    if (seenRestaurantIds.has(id)) return false;
    seenRestaurantIds.add(id);
    return true;
  });

  const legacyUserIds = new Set<number>();
  uniqueRestaurants.forEach((r) => legacyUserIds.add(cleanNum(r[8])!));
  scoreRows.forEach((s) => legacyUserIds.add(cleanNum(s[7])!));

  const userMap = new Map<number, string>();
  for (const legacyId of legacyUserIds) {
    const email = `legacy-user-${legacyId}@foodiesaurus.local`;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      userMap.set(legacyId, existing.id);
      continue;
    }
    const created = await prisma.user.create({
      data: { email, name: `Usuario legacy ${legacyId}` },
    });
    userMap.set(legacyId, created.id);
  }
  console.log(`Usuarios migrados/mapeados: ${userMap.size}`);

  for (const r of uniqueRestaurants) {
    const id = cleanNum(r[0])!;
    const ownerLegacyId = cleanNum(r[8])!;
    await prisma.restaurant.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name: truncate(cleanStr(r[1]), 40)!,
        province: truncate(cleanStr(r[2]), 50)!,
        address: truncate(cleanStr(r[3]), 150)!,
        zip: truncate(cleanStr(r[4]), 10),
        url: truncate(cleanStr(r[5]), 100),
        phone: truncate(cleanStr(r[6]), 30),
        foodType: truncate(cleanStr(r[7]), 40),
        latitude: cleanNum(r[9]),
        longitude: cleanNum(r[10]),
        apiId: truncate(cleanStr(r[11]), 150),
        ownerId: userMap.get(ownerLegacyId)!,
      },
    });
  }

  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('restaurants','id'), (SELECT MAX(id) FROM restaurants))`
  );

  const seenScoreKeys = new Set<string>();
  const uniqueScores = scoreRows.filter((s) => {
    const key = `${s[1]}|${s[7]}|${s[8]}|${s[2]}`;
    if (seenScoreKeys.has(key)) return false;
    seenScoreKeys.add(key);
    return true;
  });

  let insertedScores = 0;
  for (const s of uniqueScores) {
    const userLegacyId = cleanNum(s[7])!;
    const restaurantId = cleanNum(s[8])!;
    if (!seenRestaurantIds.has(restaurantId)) continue;
    await prisma.score.create({
      data: {
        comment: truncate(cleanStr(s[1]), 300),
        createdAt: cleanStr(s[2]) ? new Date(cleanStr(s[2])!) : new Date(),
        generalScore: cleanNum(s[3])!,
        allergenChart: cleanNum(s[4])!,
        fidelityScore: cleanNum(s[5])!,
        attentionScore: cleanNum(s[6])!,
        allergicReaction: cleanNum(s[10]),
        userId: userMap.get(userLegacyId)!,
        restaurantId,
      },
    });
    insertedScores++;
  }

  console.log(`Scores insertados: ${insertedScores}`);
  console.log("Migración completada.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

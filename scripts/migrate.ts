import "dotenv/config";
import fs from "fs";
import { Pool } from "pg";

const sql = fs.readFileSync("./scripts/db.sql", "utf8");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const client = await pool.connect();

  try {
    console.log("Ejecutando SQL antiguo...");

    await client.query(sql);

    console.log("Migración SQL terminada");
  } catch (error) {
    console.error("Error migrando:", error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
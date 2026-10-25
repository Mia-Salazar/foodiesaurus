import { NewRestaurant, NewScore, RestaurantEdits, RestaurantRepository, RestaurantSearchFilters, RestaurantWithScores } from "@/server/domain/restaurant/repositories/restaurant.repository";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { prisma } from "../database/prisma";
import { Prisma } from "@prisma/client";

type RestaurantSearchRow = {
  id: number;
  name: string;
  province: string;
  address: string;
  zip: string | null;
  url: string | null;
  phone: string | null;
  foodType: string | null;
  latitude: unknown;
  longitude: unknown;
  scores: { generalScore: number }[];
};

function toSearchRestaurant(r: RestaurantSearchRow): Restaurant {
  const score = r.scores.length
    ? r.scores.reduce((sum, item) => sum + item.generalScore, 0) / r.scores.length
    : undefined;

  return new Restaurant(
    r.id,
    r.name,
    r.province,
    r.address,
    r.zip ?? undefined,
    r.url ?? undefined,
    r.phone ?? undefined,
    r.foodType ?? undefined,
    r.latitude != null ? Number(r.latitude) : undefined,
    r.longitude != null ? Number(r.longitude) : undefined,
    score,
  );
}

export class PrismaRestaurantRepository implements RestaurantRepository {
  async search(filters: RestaurantSearchFilters): Promise<Restaurant[]> {
    const where: Prisma.RestaurantWhereInput = {
      province: { equals: filters.province, mode: "insensitive" },
      ...(filters.term
        ? { name: { contains: filters.term, mode: "insensitive" } }
        : {}),
    };

    const rows = await prisma.restaurant.findMany({
      where,
      orderBy: { name: "asc" },
      include: {
        scores: { select: { generalScore: true } },
      },
    });

    return rows.map(toSearchRestaurant);
  }

  async searchByName(term: string): Promise<Restaurant[]> {
    const rows = await prisma.restaurant.findMany({
      where: { name: { contains: term, mode: "insensitive" } },
      orderBy: { name: "asc" },
      include: {
        scores: { select: { generalScore: true } },
      },
    });

    return rows.map(toSearchRestaurant);
  }

  async findCreatedByHand(ownerId: string): Promise<Restaurant[]> {
    const rows = await prisma.restaurant.findMany({
      where: { ownerId, apiId: null },
      orderBy: { name: "asc" },
      include: {
        scores: { select: { generalScore: true } },
      },
    });

    return rows.map(toSearchRestaurant);
  }

  async findCreatedByHandById(id: number, ownerId: string): Promise<Restaurant | null> {
    const row = await prisma.restaurant.findFirst({
      where: { id, ownerId, apiId: null },
      include: { scores: { select: { generalScore: true } } },
    });
    return row ? toSearchRestaurant(row) : null;
  }

  async updateCreatedByHand(
    id: number,
    ownerId: string,
    edits: RestaurantEdits,
  ): Promise<Restaurant | null> {
    const existing = await prisma.restaurant.findFirst({
      where: { id, ownerId, apiId: null },
      select: { id: true },
    });
    if (!existing) return null;

    const row = await prisma.restaurant.update({
      where: { id },
      data: {
        name: edits.name,
        province: edits.province,
        address: edits.address,
        zip: edits.zip ?? null,
        url: edits.url ?? null,
        phone: edits.phone ?? null,
        foodType: edits.foodType ?? null,
      },
      include: { scores: { select: { generalScore: true } } },
    });

    return toSearchRestaurant(row);
  }

  async findById(id: number): Promise<RestaurantWithScores | null> {
    const row = await prisma.restaurant.findUnique({
      where: { id },
      include: {
        scores: {
          orderBy: { createdAt: "desc" },
          include: {
            user: { select: { name: true } },
          },
        },
      },
    });

    if (!row) return null;

    return {
      restaurant: new Restaurant(
        row.id,
        row.name,
        row.province,
        row.address,
        row.zip ?? undefined,
        row.url ?? undefined,
        row.phone ?? undefined,
        row.foodType ?? undefined,
        row.latitude ? Number(row.latitude) : undefined,
        row.longitude ? Number(row.longitude) : undefined,
      ),
      scores: row.scores.map((score) => ({
        id: score.id,
        comment: score.comment ?? undefined,
        createdAt: score.createdAt,
        generalScore: score.generalScore,
        allergenChart: score.allergenChart,
        fidelityScore: score.fidelityScore,
        attentionScore: score.attentionScore,
        allergicReaction: score.allergicReaction ?? undefined,
        userName: score.user.name ?? undefined,
      })),
    };
  }

  async create(restaurant: NewRestaurant): Promise<Restaurant> {
    const row = await prisma.restaurant.create({ data: restaurant });

    return toSearchRestaurant({ ...row, scores: [] });
  }

  async addScore(score: NewScore): Promise<{ id: number }> {
    return prisma.score.create({ data: score, select: { id: true } });
  }

  async createWithScore(
    restaurant: NewRestaurant,
    score: Omit<NewScore, "restaurantId">,
  ): Promise<{ restaurantId: number }> {
    return prisma.$transaction(async (tx) => {
      const row = await tx.restaurant.create({ data: restaurant });
      await tx.score.create({
        data: { ...score, restaurantId: row.id },
      });
      return { restaurantId: row.id };
    });
  }
}

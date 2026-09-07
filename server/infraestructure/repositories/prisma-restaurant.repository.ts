import { RestaurantRepository, RestaurantSearchFilters } from "@/server/domain/restaurant/repositories/restaurant.repository";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { prisma } from "../database/prisma";
import { Prisma } from "@prisma/client";

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
    });

    return rows.map(
      (r) =>
        new Restaurant(
          r.id,
          r.name,
          r.province,
          r.address,
          r.zip ?? undefined,
          r.url ?? undefined,
          r.phone ?? undefined,
          r.foodType ?? undefined,
          r.latitude ? Number(r.latitude) : undefined,
          r.longitude ? Number(r.longitude) : undefined,
        )
    );
  }
}
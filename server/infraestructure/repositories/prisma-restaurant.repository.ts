import { RestaurantRepository } from "@/server/domain/restaurant/repositories/restaurant.repository";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { prisma } from "../database/prisma";

export class PrismaRestaurantRepository implements RestaurantRepository {
  async findByProvince(province: string): Promise<Restaurant[]> {
    const rows = await prisma.restaurant.findMany({
      where: { province: { equals: province, mode: "insensitive" } },
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
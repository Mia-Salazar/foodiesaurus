import { RestaurantRepository } from "@/server/domain/restaurant/repositories/restaurant.repository";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";

export class GetRestaurantsByProvinceUseCase {
  constructor(private readonly repository: RestaurantRepository) {}

  async execute(province: string): Promise<Restaurant[]> {
    if (!province || province.trim().length === 0) {
      throw new Error("Province parameter is required");
    }
    return this.repository.findByProvince(province.trim());
  }
}
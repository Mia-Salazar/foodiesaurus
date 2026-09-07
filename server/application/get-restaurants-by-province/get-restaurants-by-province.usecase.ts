import { RestaurantRepository, RestaurantSearchFilters } from "@/server/domain/restaurant/repositories/restaurant.repository";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";

export class SearchRestaurantsUseCase {
  constructor(private readonly repository: RestaurantRepository) {}

  async execute(filters: RestaurantSearchFilters): Promise<Restaurant[]> {
    if (!filters.province || filters.province.trim().length === 0) {
      throw new Error("Province parameter is required");
    }
    return this.repository.search({
      province: filters.province.trim(),
      term: filters.term?.trim(),
    });
  }
}
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import {
  RestaurantRepository,
  RestaurantSearchFilters,
  RestaurantWithScores,
} from "@/server/domain/restaurant/repositories/restaurant.repository";

export class InMemoryRestaurantRepository implements RestaurantRepository {
  constructor(
    private readonly restaurants: Restaurant[] = [],
    private readonly details = new Map<number, RestaurantWithScores>(),
  ) {}

  async search(filters: RestaurantSearchFilters): Promise<Restaurant[]> {
    const province = filters.province.toLowerCase();
    const term = filters.term?.toLowerCase();

    return this.restaurants
      .filter((restaurant) => {
        const sameProvince = restaurant.province.toLowerCase() === province;
        const matchesTerm = !term || restaurant.name.toLowerCase().includes(term);
        return sameProvince && matchesTerm;
      })
      .sort((a, b) => a.name.localeCompare(b.name, "es"));
  }

  async searchByName(term: string): Promise<Restaurant[]> {
    const name = term.toLowerCase();

    return this.restaurants
      .filter((restaurant) => restaurant.name.toLowerCase().includes(name))
      .sort((a, b) => a.name.localeCompare(b.name, "es"));
  }

  async findById(id: number): Promise<RestaurantWithScores | null> {
    return this.details.get(id) ?? null;
  }
}

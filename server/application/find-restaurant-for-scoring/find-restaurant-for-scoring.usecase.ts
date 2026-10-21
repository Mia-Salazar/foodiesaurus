import { DirectoryRestaurant } from "@/server/domain/restaurant/entities/directory-restaurant";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { RestaurantDirectory } from "@/server/domain/restaurant/repositories/restaurant-directory";
import { RestaurantRepository } from "@/server/domain/restaurant/repositories/restaurant.repository";

export type FindRestaurantForScoringResult =
  | { source: "catalog"; restaurants: Restaurant[] }
  | { source: "directory"; restaurants: DirectoryRestaurant[] };

export class FindRestaurantForScoringUseCase {
  constructor(
    private readonly catalog: RestaurantRepository,
    private readonly restaurantDirectory: RestaurantDirectory,
  ) {}

  async execute(term: string): Promise<FindRestaurantForScoringResult> {
    const name = term.trim();
    if (!name) {
      throw new Error("Name is required");
    }

    const catalogRestaurants = await this.catalog.searchByName(name);
    if (catalogRestaurants.length > 0) {
      return { source: "catalog", restaurants: catalogRestaurants };
    }

    const directoryRestaurants = await this.restaurantDirectory.searchByName(name);
    return { source: "directory", restaurants: directoryRestaurants };
  }
}

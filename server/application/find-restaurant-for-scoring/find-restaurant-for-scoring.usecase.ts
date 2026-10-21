import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { SpainRestaurant } from "@/server/domain/restaurant/entities/spain-restaurant";
import { RestaurantRepository } from "@/server/domain/restaurant/repositories/restaurant.repository";
import { SpainRestaurantDirectory } from "@/server/domain/restaurant/repositories/spain-restaurant.directory";

export type FindRestaurantForScoringResult =
  | { source: "ours"; restaurants: Restaurant[] }
  | { source: "spain"; restaurants: SpainRestaurant[] };

export class FindRestaurantForScoringUseCase {
  constructor(
    private readonly restaurants: RestaurantRepository,
    private readonly spainDirectory: SpainRestaurantDirectory,
  ) {}

  async execute(term: string): Promise<FindRestaurantForScoringResult> {
    const name = term.trim();
    if (!name) {
      throw new Error("Name is required");
    }

    const ours = await this.restaurants.searchByName(name);
    if (ours.length > 0) {
      return { source: "ours", restaurants: ours };
    }

    const spain = await this.spainDirectory.searchByName(name);
    return { source: "spain", restaurants: spain };
  }
}

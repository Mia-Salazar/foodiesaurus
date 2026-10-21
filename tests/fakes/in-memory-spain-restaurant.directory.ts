import { SpainRestaurant } from "@/server/domain/restaurant/entities/spain-restaurant";
import { SpainRestaurantDirectory } from "@/server/domain/restaurant/repositories/spain-restaurant.directory";

export class InMemorySpainRestaurantDirectory implements SpainRestaurantDirectory {
  constructor(private readonly restaurants: SpainRestaurant[] = []) {}

  readonly calls: string[] = [];

  async searchByName(term: string): Promise<SpainRestaurant[]> {
    this.calls.push(term);
    const name = term.toLowerCase();

    return this.restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(name),
    );
  }
}

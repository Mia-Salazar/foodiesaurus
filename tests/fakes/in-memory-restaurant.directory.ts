import { DirectoryRestaurant } from "@/server/domain/restaurant/entities/directory-restaurant";
import { RestaurantDirectory } from "@/server/domain/restaurant/repositories/restaurant-directory";

export class InMemoryRestaurantDirectory implements RestaurantDirectory {
  constructor(private readonly restaurants: DirectoryRestaurant[] = []) {}

  readonly calls: string[] = [];

  async searchByName(term: string): Promise<DirectoryRestaurant[]> {
    this.calls.push(term);
    const name = term.toLowerCase();

    return this.restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(name),
    );
  }
}

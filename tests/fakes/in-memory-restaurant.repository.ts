import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import {
  NewRestaurant,
  NewScore,
  RestaurantRepository,
  RestaurantSearchFilters,
  RestaurantWithScores,
} from "@/server/domain/restaurant/repositories/restaurant.repository";

export class InMemoryRestaurantRepository implements RestaurantRepository {
  readonly created: NewRestaurant[] = [];
  readonly addedScores: NewScore[] = [];

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

  async create(input: NewRestaurant): Promise<Restaurant> {
    const id = Math.max(0, ...this.restaurants.map((item) => item.id)) + 1;
    const restaurant = new Restaurant(
      id,
      input.name,
      input.province,
      input.address,
      input.zip,
      input.url,
      input.phone,
      input.foodType,
    );

    this.created.push(input);
    this.restaurants.push(restaurant);
    return restaurant;
  }

  async addScore(score: NewScore): Promise<{ id: number }> {
    this.addedScores.push(score);
    return { id: this.addedScores.length };
  }

  async createWithScore(
    restaurant: NewRestaurant,
    score: Omit<NewScore, "restaurantId">,
  ): Promise<{ restaurantId: number }> {
    const created = await this.create(restaurant);
    await this.addScore({ ...score, restaurantId: created.id });
    return { restaurantId: created.id };
  }
}

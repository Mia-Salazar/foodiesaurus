import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import {
  NewRestaurant,
  NewScore,
  RestaurantEdits,
  RestaurantRepository,
  RestaurantSearchFilters,
  RestaurantWithScores,
} from "@/server/domain/restaurant/repositories/restaurant.repository";

export class InMemoryRestaurantRepository implements RestaurantRepository {
  readonly created: NewRestaurant[] = [];
  readonly addedScores: NewScore[] = [];
  private readonly handCreatedByOwner = new Map<string, Restaurant[]>();

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
    if (!input.apiId) {
      const owned = this.handCreatedByOwner.get(input.ownerId) ?? [];
      owned.push(restaurant);
      this.handCreatedByOwner.set(input.ownerId, owned);
    }
    return restaurant;
  }

  async findCreatedByHand(ownerId: string): Promise<Restaurant[]> {
    return [...(this.handCreatedByOwner.get(ownerId) ?? [])].sort((a, b) =>
      a.name.localeCompare(b.name, "es"),
    );
  }

  async findCreatedByHandById(id: number, ownerId: string): Promise<Restaurant | null> {
    return (
      (this.handCreatedByOwner.get(ownerId) ?? []).find((item) => item.id === id) ??
      null
    );
  }

  async updateCreatedByHand(
    id: number,
    ownerId: string,
    edits: RestaurantEdits,
  ): Promise<Restaurant | null> {
    const owned = this.handCreatedByOwner.get(ownerId) ?? [];
    const index = owned.findIndex((item) => item.id === id);
    if (index < 0) return null;

    const current = owned[index];
    const updated = new Restaurant(
      current.id,
      edits.name,
      edits.province,
      edits.address,
      edits.zip,
      edits.url,
      edits.phone,
      edits.foodType,
      current.latitude,
      current.longitude,
      current.score,
    );
    owned[index] = updated;
    const listIndex = this.restaurants.findIndex((item) => item.id === id);
    if (listIndex >= 0) this.restaurants[listIndex] = updated;
    return updated;
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

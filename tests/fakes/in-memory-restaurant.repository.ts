import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import {
  NewRestaurant,
  NewScore,
  RestaurantEdits,
  RestaurantRepository,
  RestaurantSearchFilters,
  RestaurantWithScores,
  ScoreChanges,
  UserScore,
} from "@/server/domain/restaurant/repositories/restaurant.repository";

export class InMemoryRestaurantRepository implements RestaurantRepository {
  readonly created: NewRestaurant[] = [];
  readonly addedScores: NewScore[] = [];
  private readonly handCreatedByOwner = new Map<string, Restaurant[]>();
  private readonly scoresByUser: { score: NewScore; id: number; createdAt: Date }[] = [];

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
    const id = this.addedScores.length;
    this.scoresByUser.push({ score, id, createdAt: new Date() });
    return { id };
  }

  async findScoresByUser(userId: string): Promise<UserScore[]> {
    return this.scoresByUser
      .filter((item) => item.score.userId === userId)
      .map((item) => this.toUserScore(item))
      .sort((a, b) => b.id - a.id);
  }

  async findScoreByUser(id: number, userId: string): Promise<UserScore | null> {
    const item = this.scoresByUser.find(
      (score) => score.id === id && score.score.userId === userId,
    );
    return item ? this.toUserScore(item) : null;
  }

  async updateScoreByUser(
    id: number,
    userId: string,
    changes: ScoreChanges,
  ): Promise<UserScore | null> {
    const index = this.scoresByUser.findIndex(
      (item) => item.id === id && item.score.userId === userId,
    );
    if (index < 0) return null;

    const current = this.scoresByUser[index];
    this.scoresByUser[index] = {
      ...current,
      score: {
        ...current.score,
        ...changes,
        restaurantId: current.score.restaurantId,
        userId: current.score.userId,
      },
    };
    return this.toUserScore(this.scoresByUser[index]);
  }

  private toUserScore(item: {
    score: NewScore;
    id: number;
    createdAt: Date;
  }): UserScore {
    return {
      id: item.id,
      restaurantId: item.score.restaurantId,
      restaurantName:
        this.restaurants.find((restaurant) => restaurant.id === item.score.restaurantId)
          ?.name ?? "",
      createdAt: item.createdAt,
      generalScore: item.score.generalScore,
      allergenChart: item.score.allergenChart,
      fidelityScore: item.score.fidelityScore,
      attentionScore: item.score.attentionScore,
      allergicReaction: item.score.allergicReaction,
      comment: item.score.comment,
    };
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

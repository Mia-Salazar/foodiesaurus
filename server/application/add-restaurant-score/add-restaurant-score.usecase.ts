import { toStoredScore } from "@/server/domain/restaurant/lib/toStoredScore";
import { RestaurantRepository } from "@/server/domain/restaurant/repositories/restaurant.repository";

export interface AddRestaurantScoreInput {
  restaurantId: number;
  userId: string;
  hasAllergenChart: boolean;
  allergenChartQuality?: number;
  hadAllergicReaction: boolean;
  attentionScore: number;
  comment?: string;
}

export class AddRestaurantScoreUseCase {
  constructor(private readonly repository: RestaurantRepository) {}

  async execute(input: AddRestaurantScoreInput): Promise<{ id: number } | null> {
    const restaurant = await this.repository.findById(input.restaurantId);
    if (!restaurant) return null;

    const stored = toStoredScore(input);

    return this.repository.addScore({
      ...stored,
      restaurantId: input.restaurantId,
      userId: input.userId,
    });
  }
}

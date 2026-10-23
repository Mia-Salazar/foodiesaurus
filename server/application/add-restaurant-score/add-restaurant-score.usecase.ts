import { computeRestaurantAverages } from "@/server/domain/restaurant/lib/computeRestaurantAverages";
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

    const ratings = {
      allergenChart: input.hasAllergenChart ? 1 : 0,
      fidelityScore: input.hasAllergenChart ? (input.allergenChartQuality ?? 0) : 0,
      attentionScore: input.attentionScore,
      allergicReaction: input.hadAllergicReaction ? 1 : 0,
    };

    return this.repository.addScore({
      ...ratings,
      restaurantId: input.restaurantId,
      userId: input.userId,
      generalScore: computeRestaurantAverages([ratings])!.general,
      comment: input.comment,
    });
  }
}

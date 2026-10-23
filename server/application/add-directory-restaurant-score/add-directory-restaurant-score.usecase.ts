import { toStoredScore } from "@/server/domain/restaurant/lib/toStoredScore";
import { RestaurantRepository } from "@/server/domain/restaurant/repositories/restaurant.repository";

export interface AddDirectoryRestaurantScoreInput {
  userId: string;
  name: string;
  province: string;
  address: string;
  zip?: string;
  apiId?: string;
  latitude?: number;
  longitude?: number;
  hasAllergenChart: boolean;
  allergenChartQuality?: number;
  hadAllergicReaction: boolean;
  attentionScore: number;
  comment?: string;
}

export class AddDirectoryRestaurantScoreUseCase {
  constructor(private readonly repository: RestaurantRepository) {}

  execute(input: AddDirectoryRestaurantScoreInput): Promise<{ restaurantId: number }> {
    const stored = toStoredScore(input);

    return this.repository.createWithScore(
      {
        ownerId: input.userId,
        name: input.name,
        province: input.province,
        address: input.address,
        zip: input.zip,
        apiId: input.apiId,
        latitude: input.latitude,
        longitude: input.longitude,
      },
      {
        userId: input.userId,
        generalScore: stored.generalScore,
        allergenChart: stored.allergenChart,
        fidelityScore: stored.fidelityScore,
        attentionScore: stored.attentionScore,
        allergicReaction: stored.allergicReaction,
        comment: stored.comment,
      },
    );
  }
}

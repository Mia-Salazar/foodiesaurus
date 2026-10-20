import { RestaurantDetail } from "@/server/domain/restaurant/entities/restaurant-detail";
import { computeRestaurantAverages } from "@/server/domain/restaurant/lib/computeRestaurantAverages";
import { RestaurantRepository } from "@/server/domain/restaurant/repositories/restaurant.repository";

export class GetRestaurantByIdUseCase {
  constructor(private readonly repository: RestaurantRepository) {}

  async execute(id: number): Promise<RestaurantDetail | null> {
    const result = await this.repository.findById(id);
    if (!result) return null;

    const { restaurant, scores } = result;
    const reviews = scores
      .filter((score) => score.comment?.trim())
      .map((score) => ({
        id: score.id,
        userName: score.userName?.trim() || "Foodie",
        createdAt: score.createdAt.toISOString(),
        generalScore: score.generalScore,
        allergenChart: score.allergenChart === 1,
        fidelityScore: score.fidelityScore,
        attentionScore: score.attentionScore,
        allergicReaction: score.allergicReaction === 1,
        comment: score.comment?.trim(),
      }));

    return {
      id: restaurant.id,
      name: restaurant.name,
      province: restaurant.province,
      address: restaurant.address,
      zip: restaurant.zip,
      url: restaurant.url,
      phone: restaurant.phone,
      foodType: restaurant.foodType,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      averages: computeRestaurantAverages(scores),
      reviews,
    };
  }
}

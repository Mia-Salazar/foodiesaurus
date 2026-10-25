import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import {
  RestaurantEdits,
  RestaurantRepository,
} from "@/server/domain/restaurant/repositories/restaurant.repository";

export class UpdateHandCreatedRestaurantUseCase {
  constructor(private readonly repository: RestaurantRepository) {}

  execute(
    id: number,
    ownerId: string,
    edits: RestaurantEdits,
  ): Promise<Restaurant | null> {
    return this.repository.updateCreatedByHand(id, ownerId, edits);
  }
}

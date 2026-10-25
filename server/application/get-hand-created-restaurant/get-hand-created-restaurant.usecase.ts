import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { RestaurantRepository } from "@/server/domain/restaurant/repositories/restaurant.repository";

export class GetHandCreatedRestaurantUseCase {
  constructor(private readonly repository: RestaurantRepository) {}

  execute(id: number, ownerId: string): Promise<Restaurant | null> {
    return this.repository.findCreatedByHandById(id, ownerId);
  }
}

import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { RestaurantRepository } from "@/server/domain/restaurant/repositories/restaurant.repository";

export class ListHandCreatedRestaurantsUseCase {
  constructor(private readonly repository: RestaurantRepository) {}

  execute(ownerId: string): Promise<Restaurant[]> {
    return this.repository.findCreatedByHand(ownerId);
  }
}

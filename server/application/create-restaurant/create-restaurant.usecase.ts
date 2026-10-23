import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import {
  NewRestaurant,
  RestaurantRepository,
} from "@/server/domain/restaurant/repositories/restaurant.repository";

export class CreateRestaurantUseCase {
  constructor(private readonly repository: RestaurantRepository) {}

  async execute(restaurant: NewRestaurant): Promise<Restaurant> {
    return this.repository.create(restaurant);
  }
}

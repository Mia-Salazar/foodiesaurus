import { Restaurant } from "../entities/restaurant.entity";

export interface RestaurantRepository {
  findByProvince(province: string): Promise<Restaurant[]>;
}
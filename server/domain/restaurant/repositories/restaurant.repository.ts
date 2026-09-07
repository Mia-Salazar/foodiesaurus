import { Restaurant } from "../entities/restaurant.entity";

export interface RestaurantSearchFilters {
  province: string;
  term?: string;
}

export interface RestaurantRepository {
  search(filters: RestaurantSearchFilters): Promise<Restaurant[]>;
}
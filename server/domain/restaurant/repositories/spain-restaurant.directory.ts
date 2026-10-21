import { SpainRestaurant } from "../entities/spain-restaurant";

export interface SpainRestaurantDirectory {
  searchByName(term: string): Promise<SpainRestaurant[]>;
}

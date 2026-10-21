import { DirectoryRestaurant } from "../entities/spain-restaurant";

export interface RestaurantDirectory {
  searchByName(term: string): Promise<DirectoryRestaurant[]>;
}

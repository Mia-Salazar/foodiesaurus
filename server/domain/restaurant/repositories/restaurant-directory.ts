import { DirectoryRestaurant } from "../entities/directory-restaurant";

export interface RestaurantDirectory {
  searchByName(term: string): Promise<DirectoryRestaurant[]>;
}

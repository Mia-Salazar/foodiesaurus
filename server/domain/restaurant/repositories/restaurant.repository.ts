import { Restaurant } from "../entities/restaurant.entity";

export interface RestaurantSearchFilters {
  province: string;
  term?: string;
}

export interface RestaurantScoreRecord {
  id: number;
  comment?: string;
  createdAt: Date;
  generalScore: number;
  allergenChart: number;
  fidelityScore: number;
  attentionScore: number;
  allergicReaction?: number;
  userName?: string;
}

export interface RestaurantWithScores {
  restaurant: Restaurant;
  scores: RestaurantScoreRecord[];
}

export interface RestaurantRepository {
  search(filters: RestaurantSearchFilters): Promise<Restaurant[]>;
  findById(id: number): Promise<RestaurantWithScores | null>;
}

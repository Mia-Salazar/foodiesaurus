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

export interface RestaurantEdits {
  name: string;
  province: string;
  address: string;
  zip?: string;
  url?: string;
  phone?: string;
  foodType?: string;
}

export interface NewRestaurant {
  ownerId: string;
  name: string;
  province: string;
  address: string;
  zip?: string;
  url?: string;
  phone?: string;
  foodType?: string;
  latitude?: number;
  longitude?: number;
  apiId?: string;
}

export interface NewScore {
  restaurantId: number;
  userId: string;
  generalScore: number;
  allergenChart: number;
  fidelityScore: number;
  attentionScore: number;
  allergicReaction: number;
  comment?: string;
}

export interface UserScore {
  id: number;
  restaurantId: number;
  restaurantName: string;
  createdAt: Date;
  generalScore: number;
  allergenChart: number;
  fidelityScore: number;
  attentionScore: number;
  allergicReaction?: number;
  comment?: string;
}

export interface RestaurantWithScores {
  restaurant: Restaurant;
  scores: RestaurantScoreRecord[];
}

export interface RestaurantRepository {
  search(filters: RestaurantSearchFilters): Promise<Restaurant[]>;
  searchByName(term: string): Promise<Restaurant[]>;
  findCreatedByHand(ownerId: string): Promise<Restaurant[]>;
  findCreatedByHandById(id: number, ownerId: string): Promise<Restaurant | null>;
  updateCreatedByHand(
    id: number,
    ownerId: string,
    edits: RestaurantEdits,
  ): Promise<Restaurant | null>;
  findById(id: number): Promise<RestaurantWithScores | null>;
  create(restaurant: NewRestaurant): Promise<Restaurant>;
  addScore(score: NewScore): Promise<{ id: number }>;
  findScoresByUser(userId: string): Promise<UserScore[]>;
  createWithScore(
    restaurant: NewRestaurant,
    score: Omit<NewScore, "restaurantId">,
  ): Promise<{ restaurantId: number }>;
}

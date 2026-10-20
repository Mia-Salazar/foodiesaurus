export interface RestaurantReview {
  id: number;
  userName: string;
  createdAt: string;
  generalScore: number;
  allergenChart: boolean;
  fidelityScore: number;
  attentionScore: number;
  allergicReaction: boolean;
  comment?: string;
}

export interface RestaurantAverages {
  general: number;
  attention: number;
  allergenChartPercent: number;
  fidelity: number;
  allergicReactionPercent: number;
  totalReviews: number;
}

export interface RestaurantDetail {
  id: number;
  name: string;
  province: string;
  address: string;
  zip?: string;
  url?: string;
  phone?: string;
  foodType?: string;
  latitude?: number;
  longitude?: number;
  averages: RestaurantAverages | null;
  reviews: RestaurantReview[];
}

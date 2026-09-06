export interface Restaurant {
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
}
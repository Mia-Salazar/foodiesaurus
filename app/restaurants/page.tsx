import { Restaurant as ListedRestaurant } from "@/client/entities/restaurant/model/types";
import { RestaurantsPage } from "@/client/pages/restaurants/RestaurantsPage";
import { isRestaurantSort } from "@/client/features/search-restaurants/lib/sortRestaurants";
import { SearchRestaurantsUseCase } from "@/server/application/get-restaurants-by-province/get-restaurants-by-province.usecase";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";

type SearchParams = Promise<{
  province?: string | string[];
  term?: string | string[];
  sort?: string | string[];
}>;

function readParam(value?: string | string[]): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed || undefined;
}

function toListedRestaurant(restaurant: Restaurant): ListedRestaurant {
  return {
    id: restaurant.id,
    name: restaurant.name,
    province: restaurant.province,
    address: restaurant.address,
    zip: restaurant.zip,
    url: restaurant.url,
    phone: restaurant.phone,
    foodType: restaurant.foodType,
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
    score: restaurant.score,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const province = readParam(params.province);
  const term = readParam(params.term);
  const sortParam = readParam(params.sort);
  let restaurants: ListedRestaurant[] = [];
  let error: string | undefined;

  if (province) {
    try {
      const found = await new SearchRestaurantsUseCase(
        new PrismaRestaurantRepository(),
      ).execute({ province, term });
      restaurants = found.map(toListedRestaurant);
    } catch (caught) {
      console.error(caught);
      error = "No hemos podido mostrar los restaurantes. Prueba otra vez.";
    }
  }

  return (
    <RestaurantsPage
      province={province}
      term={term}
      sort={isRestaurantSort(sortParam) ? sortParam : "name"}
      restaurants={restaurants}
      error={error}
    />
  );
}

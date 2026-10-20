import { RestaurantsPage } from "@/client/pages/restaurants/RestaurantsPage";
import { isRestaurantSort } from "@/client/features/search-restaurants/lib/sortRestaurants";

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

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const sortParam = readParam(params.sort);

  return (
    <RestaurantsPage
      province={readParam(params.province)}
      term={readParam(params.term)}
      sort={isRestaurantSort(sortParam) ? sortParam : "name"}
    />
  );
}

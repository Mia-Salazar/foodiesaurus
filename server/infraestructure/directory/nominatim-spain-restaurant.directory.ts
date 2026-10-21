import { SpainRestaurant } from "@/server/domain/restaurant/entities/spain-restaurant";
import { SpainRestaurantDirectory } from "@/server/domain/restaurant/repositories/spain-restaurant.directory";

interface NominatimPlace {
  osm_id?: number;
  osm_type?: string;
  name?: string;
  display_name?: string;
  lat?: string;
  lon?: string;
  category?: string;
  type?: string;
  address?: {
    house_number?: string;
    road?: string;
    postcode?: string;
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    state?: string;
    province?: string;
  };
}

const RESTAURANT_TYPES = new Set([
  "restaurant",
  "cafe",
  "fast_food",
  "bar",
  "pub",
  "food_court",
  "biergarten",
]);

function isRestaurant(place: NominatimPlace) {
  return RESTAURANT_TYPES.has((place.type ?? "").toLowerCase());
}

function formatAddress(place: NominatimPlace) {
  const address = place.address ?? {};
  const street = [address.road, address.house_number].filter(Boolean).join(" ");
  const city = address.city ?? address.town ?? address.village ?? address.municipality;
  const formatted = [street, address.postcode, city, address.state ?? address.province]
    .filter(Boolean)
    .join(", ");

  if (formatted) return formatted;
  return place.display_name ?? "";
}

export class NominatimSpainRestaurantDirectory implements SpainRestaurantDirectory {
  async searchByName(term: string): Promise<SpainRestaurant[]> {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", term);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("countrycodes", "es");
    url.searchParams.set("limit", "15");

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Foodiesaurus/1.0 (restaurant lookup)",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Restaurant directory is unavailable");
    }

    const places = (await response.json()) as NominatimPlace[];
    const seen = new Set<string>();

    return places.flatMap((place) => {
      const name = place.name?.trim();
      if (!name || !isRestaurant(place)) return [];

      const sourceId = `${place.osm_type ?? "place"}:${place.osm_id ?? name}`;
      if (seen.has(sourceId)) return [];
      seen.add(sourceId);

      const latitude = place.lat != null ? Number(place.lat) : undefined;
      const longitude = place.lon != null ? Number(place.lon) : undefined;

      return [
        new SpainRestaurant(
          sourceId,
          name,
          formatAddress(place),
          place.address?.state ?? place.address?.province,
          place.address?.postcode,
          Number.isFinite(latitude) ? latitude : undefined,
          Number.isFinite(longitude) ? longitude : undefined,
        ),
      ];
    });
  }
}

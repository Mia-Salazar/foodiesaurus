"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DirectoryRestaurantMatch } from "@/client/features/add-restaurant/model/types";
import { saveRestaurantWithScore } from "@/client/features/add-score/api/saveRestaurantWithScore";
import { RESTAURANT_PROVINCES } from "@/client/entities/restaurant/restaurant.constants";
import { ScoreForm } from "./ScoreForm";

const selectClassName =
  "min-h-11 w-full rounded border border-gray-dark bg-white p-3 text-neutral-900";

export function AddDirectoryScoreForm({
  restaurant,
}: {
  restaurant: DirectoryRestaurantMatch;
}) {
  const router = useRouter();
  const needsProvince = !restaurant.province;
  const [province, setProvince] = useState(restaurant.province ?? "");

  return (
    <ScoreForm
      extraComplete={!needsProvince || province !== ""}
      onSave={async (score) => {
        const saved = await saveRestaurantWithScore({
          ...score,
          name: restaurant.name,
          address: restaurant.address,
          province,
          zip: restaurant.zip,
          apiId: restaurant.sourceId,
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
        });
        router.push(`/restaurants/${saved.id}`);
      }}
    >
      {needsProvince && (
        <div className="flex flex-col gap-2">
          <label htmlFor="directory-restaurant-province">Provincia</label>
          <select
            id="directory-restaurant-province"
            name="province"
            required
            className={selectClassName}
            value={province}
            onChange={(event) => setProvince(event.target.value)}
            aria-describedby="directory-restaurant-province-help"
            aria-required="true"
          >
            <option value="" disabled>
              Elige una provincia
            </option>
            {RESTAURANT_PROVINCES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <p
            id="directory-restaurant-province-help"
            className="m-0 text-sm text-neutral-800"
          >
            Provincia es la zona. Elige una. Es obligatorio.
          </p>
        </div>
      )}
    </ScoreForm>
  );
}

"use client"

import Button from "@/client/shared/ui/atoms/Button";
import Input from "@/client/shared/ui/atoms/Input";
import { AVAILABLE_RESTAURANT_PROVINCES, FOOD_TYPES } from "../../entities/restaurant/restaurant.constants.trestaurant.constants";
import { useState } from "react";

export default function RestaurantSearchForm() {
  const [selectedProvince, setSelectedProvince] = useState("Madrid");
  const [selectedFoodType, setSelectedFoodType] = useState("");

  return (
    <section className="my-12 px-4 py-10 bg-foodiesaurus">
      <div className="max-w-xl mx-auto md:my-5 text-white">
        <h2 className="
          text-center
          text-white
          text-2xl
          font-bold
          max-w-md
          mx-auto
          mb-4
        ">
          Empieza a buscar restaurantes
        </h2>

        <form className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">
              Nombre
            </label>

            <Input
              id="name"
              name="name"
              placeholder="Nombre restaurante"
              isGhost
            />
          </div>

          <div className="
            flex
            flex-col
            gap-5

            md:grid
            md:grid-cols-2
            md:items-end
          ">
            <div className="flex flex-col gap-2">
              <label htmlFor="province">
                Provincia
              </label>

              <select
                required
                id="province"
                className="
                  p-3
                  rounded
                  border
                  border-gray-dark
                  bg-white
                  text-black
                "
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                {AVAILABLE_RESTAURANT_PROVINCES.map((province: string) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" className="h-[48px]">
              Buscar
            </Button>
          </div>
        </form>

      </div>

    </section>
  );
}
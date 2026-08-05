"use client"

import Button from "@/client/shared/ui/atoms/Button";
import Input from "@/client/shared/ui/atoms/Input";
import { AVAILABLE_RESTAURANT_PROVINCES, FOOD_TYPES } from "../../entities/restaurant/restaurant.constants.trestaurant.constants";
import { useState } from "react";

export default function RestaurantSearchForm() {
  const [selectedProvince, setSelectedProvince] = useState("Madrid");
  const [selectedFoodType, setSelectedFoodType] = useState("");

  return (
    <section className="max-w-xl mx-auto my-12 px-4 py-5">
      <h2 className="
        text-center
        text-2xl
        font-bold
        max-w-md
        mx-auto
        mb-8
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
          />
        </div>

        <div className="
          flex
          flex-col
          gap-5

          md:grid
          md:grid-cols-3
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

          <div className="flex flex-col gap-2">
            <label htmlFor="foodType">
              Tipo de comida
            </label>
            <select
              id="foodType"
              className="
                p-3
                rounded
                border
                border-gray-dark
              "
              value={selectedFoodType}
              onChange={(e) => setSelectedFoodType(e.target.value)}
            >
              <option>
                Escoge el tipo
              </option>
              {FOOD_TYPES.map((food: string) => {
                return <option key={food} value={food}>{food}</option>

              })}

            </select>

          </div>

          <Button type="submit" className="h-[48px]">
            Buscar
          </Button>
        </div>
      </form>
    </section>
  );
}
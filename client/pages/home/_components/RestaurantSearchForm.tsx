import Button from "@/client/shared/ui/atoms/Button";
import Input from "@/client/shared/ui/atoms/Input";

export default function RestaurantSearchForm() {
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
              id="province"
              className="
                p-3
                rounded
                border
                border-gray-dark
              "
            >
              <option>
                Escoge provincia
              </option>

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
            >
              <option>
                Escoge el tipo
              </option>

            </select>

          </div>

          <Button type="submit">
            Buscar
          </Button>
        </div>
      </form>
    </section>
  );
}
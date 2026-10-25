import { describe, expect, it } from "vitest";
import { InMemoryRestaurantRepository } from "@/tests/fakes/in-memory-restaurant.repository";
import { UpdateHandCreatedRestaurantUseCase } from "./update-hand-created-restaurant.usecase";

const edits = {
  name: "Canalla Nuevo",
  province: "Valencia",
  address: "Carrer Nou, 4",
  phone: "963000000",
};

describe("Given Mia created Canalla Bistro by hand", () => {
  describe("When she changes its data", () => {
    it("Then the restaurant should be updated", async () => {
      const repository = new InMemoryRestaurantRepository();
      const created = await repository.create({
        ownerId: "mia",
        name: "Canalla Bistro",
        province: "Valencia",
        address: "Carrer de la Llotja, 2",
      });

      const saved = await new UpdateHandCreatedRestaurantUseCase(repository).execute(
        created.id,
        "mia",
        edits,
      );

      expect(saved?.name).toBe("Canalla Nuevo");
      expect(saved?.address).toBe("Carrer Nou, 4");
      expect((await repository.findCreatedByHand("mia")).map((item) => item.name)).toEqual([
        "Canalla Nuevo",
      ]);
    });
  });

  describe("When someone else tries to change it", () => {
    it("Then nothing should change", async () => {
      const repository = new InMemoryRestaurantRepository();
      const created = await repository.create({
        ownerId: "mia",
        name: "Canalla Bistro",
        province: "Valencia",
        address: "Carrer de la Llotja, 2",
      });

      const saved = await new UpdateHandCreatedRestaurantUseCase(repository).execute(
        created.id,
        "other",
        edits,
      );

      expect(saved).toBeNull();
      expect((await repository.findCreatedByHand("mia"))[0].name).toBe("Canalla Bistro");
    });
  });

  describe("When the restaurant came from the Spain directory", () => {
    it("Then it should not be edited", async () => {
      const repository = new InMemoryRestaurantRepository();
      const created = await repository.create({
        ownerId: "mia",
        name: "Bar España",
        province: "Madrid",
        address: "Calle Mayor, 1",
        apiId: "node:123",
      });

      const saved = await new UpdateHandCreatedRestaurantUseCase(repository).execute(
        created.id,
        "mia",
        edits,
      );

      expect(saved).toBeNull();
    });
  });
});

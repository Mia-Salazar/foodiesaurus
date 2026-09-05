import { z } from "zod";

export const getRestaurantsByProvinceSchema = z.object({
  province: z.string().min(1, "Province is required"),
});
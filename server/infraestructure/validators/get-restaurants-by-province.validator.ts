import { z } from "zod";

export const searchRestaurantsSchema = z.object({
  province: z.string().min(1, "Province is required"),
  term: z.string().trim().max(40).optional(),
});
import { z } from "zod";

export const findRestaurantForScoringSchema = z.object({
  term: z.string().trim().min(1, "Name is required").max(40),
});

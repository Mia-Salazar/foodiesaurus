import { z } from "zod";

export const restaurantIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

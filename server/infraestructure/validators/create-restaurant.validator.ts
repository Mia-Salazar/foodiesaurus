import { z } from "zod";

function optionalText(max: number) {
  return z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined);
}

export const createRestaurantSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(40),
  province: z.string().trim().min(1, "Province is required").max(50),
  address: z.string().trim().min(1, "Address is required").max(150),
  zip: optionalText(10),
  url: optionalText(100),
  phone: optionalText(30),
  foodType: optionalText(40),
});

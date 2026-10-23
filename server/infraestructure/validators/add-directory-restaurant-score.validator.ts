import { z } from "zod";
import { addRestaurantScoreSchema } from "./add-restaurant-score.validator";

function optionalText(max: number) {
  return z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => value || undefined);
}

const directoryRestaurantSchema = z.object({
  name: z.string().trim().min(1).max(40),
  province: z.string().trim().min(1).max(50),
  address: z.string().trim().min(1).max(150),
  zip: optionalText(10),
  apiId: optionalText(150),
  latitude: z.number().finite().optional(),
  longitude: z.number().finite().optional(),
});

export const addDirectoryRestaurantScoreSchema = directoryRestaurantSchema.and(
  addRestaurantScoreSchema,
);

function emptyToUndefined(value: unknown) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed || undefined;
}

export const directoryRestaurantQuerySchema = z.object({
  name: z.string().trim().min(1).max(40),
  address: z.string().trim().min(1).max(150),
  province: z.preprocess(emptyToUndefined, z.string().trim().max(50).optional()),
  zip: z.preprocess(emptyToUndefined, z.string().trim().max(10).optional()),
  sourceId: z.preprocess(emptyToUndefined, z.string().trim().max(150).optional()),
  lat: z.preprocess(emptyToUndefined, z.coerce.number().finite().optional()),
  lng: z.preprocess(emptyToUndefined, z.coerce.number().finite().optional()),
});

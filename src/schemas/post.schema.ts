import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters" })
    .max(100),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  location: z.string().min(3, { message: "Location is required" }),
  minPrice: z.coerce
    .number()
    .min(0, { message: "Minimum price must be at least 0" }),
  maxPrice: z.coerce
    .number()
    .min(0, { message: "Maximum price must be at least 0" }),
  category: z.string().min(1, { message: "Category is required" }),
  image: z.instanceof(File).optional(),
});

export type TCreatePost = z.infer<typeof postSchema>;

import { z } from "zod";

export const createPlantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Plant name must be at least 2 characters")
    .max(100, "Plant name cannot exceed 100 characters"),

  code: z
    .string()
    .trim()
    .min(2, "Plant code must be at least 2 characters")
    .max(20, "Plant code cannot exceed 20 characters")
    .toUpperCase()
    .regex(
      /^[A-Z0-9_-]+$/,
      "Plant code can contain only letters, numbers, underscores, and hyphens"
    ),

  companyId: z.cuid({
    error: "Invalid company ID",
  }),
});
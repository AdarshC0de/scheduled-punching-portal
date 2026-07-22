import { z } from "zod";

export const createCompanySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name cannot exceed 100 characters"),

  code: z
    .string()
    .trim()
    .min(2, "Company code must be at least 2 characters")
    .max(20, "Company code cannot exceed 20 characters")
    .toUpperCase()
    .regex(
      /^[A-Z0-9_-]+$/,
      "Company code can contain only letters, numbers, underscores, and hyphens"
    ),
});
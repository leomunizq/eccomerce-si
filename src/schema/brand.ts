import { z } from 'zod'

export const brandSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Brand name must be at least 2 characters")
    .max(50, "Brand name is too long")
    .regex(/^[a-zA-Z0-9\s]+$/, "Invalid characters in brand name") // Only letters, numbers, and spaces
})

export type BrandFormData = z.infer<typeof brandSchema>

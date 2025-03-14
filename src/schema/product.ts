import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(3, 'The name must be at least 3 characters long'),
  description: z.string().optional(),
  price: z.coerce.number().min(1, 'The price must be greater than 0'),
  brand_id: z.string().uuid('Invalid brand'),
  category_id: z.string().uuid('Invalid category'),
  gender: z.enum(['male', 'female', 'unisex']),
  material: z.string().optional(),
  images: z.array(z.instanceof(File)).optional(),
  color: z.string().optional()
})

export type ProductFormData = z.infer<typeof productSchema>

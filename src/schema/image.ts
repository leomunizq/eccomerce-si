import { z } from "zod";

export const imageFormSchema = z.object({
  type: z.string().min(1, "Image type is required"),
});

export type ImageFormData = z.infer<typeof imageFormSchema>;

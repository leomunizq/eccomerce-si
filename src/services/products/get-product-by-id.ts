import { supabase } from "@/lib/supabase"

export const getProductById = async ({ id }: { id: string }) => {
  const { data, error } = await supabase
    .from('products')
    .select(
      '*, brands(name), categories(name), images(image_url), product_sizes(size_id), product_colors(color_id, colors(name, hex_code))'
    )
    .eq('id', id)
    .single()

  if (error) {
    console.error('Errore di ricerca del prodotto:', error)
    return null
  }

  return data
}

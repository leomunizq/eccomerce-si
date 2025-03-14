import { supabase } from '@/lib/supabase'

export const deleteBrand = async (brandId: string) => {
  const { data: brandData, error: brandError } = await supabase
    .from('brands')
    .delete()
    .eq('id', brandId)
    .select()
    .single()

  if (brandError) {
    throw new Error(`Error delete brand: ${brandError.message}`)
  }

  return brandData
}

export default deleteBrand

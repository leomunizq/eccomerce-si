import { supabase } from '@/lib/supabase'
import { BrandFormData } from '@/schema/brand'

export const createBrand = async (product: BrandFormData) => {
  const { data: brandData, error: brandError } = await supabase
    .from('brands')
    .insert({
      name: product.name
    })
    .select()
    .single()

  if (brandError) {
    throw new Error(`Error creating brand: ${brandError.message}`)
  }

  return brandData
}

export default createBrand

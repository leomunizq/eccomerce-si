import { supabase } from '@/lib/supabase'

export const updateBrand = async ({
  brandId,
  newName
}: {
  brandId: string
  newName: string
}) => {
  const { data, error } = await supabase
    .from('brands')
    .update({ name: newName })
    .eq('id', brandId)
    .select()
    .single()

  if (error) {
    throw new Error(`Error updating brand: ${error.message}`)
  }

  return data
}

export default updateBrand

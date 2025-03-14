import { supabase } from '@/lib/supabase'

export const getBrands = async () => {
  const { data, error } = await supabase.from('brands').select('*')

  if (error) {
    console.error('Errore nella ricerca dei marchi:', error)
    return []
  }
  return data
}

import httpClient from '@/lib/http-client'
import { Tables } from "@/types/supabase";  

type Category = Tables<'categories'>

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await httpClient.get<Category[]>('/categories?select=*')
    return data
  } catch (error) {
    console.error('Error when searching for categories:', error)
    throw new Error(
      `An error occurred while searching for categories. ${error}`
    )
  }
}

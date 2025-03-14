import httpClient from '@/lib/http-client'
import { Tables } from "@/types/supabase";  

type Colors = Tables<'colors'>

export const getColors = async (): Promise<Colors[]> => {
  try {
    const { data } = await httpClient.get<Colors[]>('/colors?select=*')
    return data
  } catch (error) {
    console.error('Error when searching for colors:', error)
    throw new Error(
      `An error occurred while searching for colors. ${error}`
    )
  }
}

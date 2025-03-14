import httpClient from '@/lib/http-client'
import { Tables } from "@/types/supabase";  

type Image = Tables<'images'>

export const getImages = async (): Promise<Image[]> => {
  try {
    const { data } = await httpClient.get<Image[]>('/images?select=*')
    return data
  } catch (error) {
    console.error('Error when searching for images:', error)
    throw new Error(
      `An error occurred while searching for images. ${error}`
    )
  }
}

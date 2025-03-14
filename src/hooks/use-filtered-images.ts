import { Tables } from "@/types/supabase"
import { useMemo } from "react"

type Image = Tables<'images'>

// custom hook per il filtraggio delle immagini
//  separa la logica di filtraggio dall'interfaccia.
export function useFilteredImages(images: Image[] | undefined, searchQuery: string): Image[] {
  return useMemo(() => {
    if (!images) return []
    const lowerCaseQuery = searchQuery.toLowerCase()
    return images.filter(
      image =>
        image.image_url.toLowerCase().includes(lowerCaseQuery) ||
        (image.type && image.type.toLowerCase().includes(lowerCaseQuery))
    )
  }, [images, searchQuery])
}

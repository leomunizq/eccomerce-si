// @leomunizq questo hook si occupa di leggere/scrivere i filtri nella URL
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export type SortKey = 'price' | 'name' | 'created_at'
export type SortDirection = 'asc' | 'desc'

export interface FiltersState {
  brand: string[]
  priceRange: { min: number; max: number }
  color: string[]
  gender: string[]
  style: string[]
  search?: string
  page?: number
  sort?: SortKey
  dir?: SortDirection
}

const PARAM_BRAND = 'brand'
const PARAM_COLOR = 'color'
const PARAM_GENDER = 'gender'
const PARAM_STYLE = 'style'
const PARAM_PRICE_MIN = 'minPrice'
const PARAM_PRICE_MAX = 'maxPrice'
const PARAM_SEARCH = 'q'
const PARAM_PAGE = 'page'
const PARAM_SORT = 'sort'
const PARAM_DIR = 'dir'

export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Legge i filtri dalla URL
  const filters: FiltersState = useMemo(() => {
    const brand = searchParams.getAll(PARAM_BRAND)
    const color = searchParams.getAll(PARAM_COLOR)
    const gender = searchParams.getAll(PARAM_GENDER)
    const style = searchParams.getAll(PARAM_STYLE)

    const minPrice = searchParams.get(PARAM_PRICE_MIN)
    const maxPrice = searchParams.get(PARAM_PRICE_MAX)

    const pageParam = searchParams.get(PARAM_PAGE)

    const q = searchParams.get(PARAM_SEARCH) || ''

    const sort = searchParams.get(PARAM_SORT) as SortKey | null
    const dir = searchParams.get(PARAM_DIR) as SortDirection | null

    return {
      brand,
      color,
      gender,
      style,
      search: q,
      priceRange: {
        min: minPrice ? Number(minPrice) : 0,
        max: maxPrice ? Number(maxPrice) : 1000
      },
      page: pageParam ? Number(pageParam) : 1,
      sort: sort ?? undefined,
      dir: dir ?? undefined
    }
  }, [searchParams])

  // Funzione che aggiorna i parametri di ricerca nell'URL
  function setFilters(newFilters: Partial<FiltersState>) {
    // unisce i nuovi filtri con quelli attuali
    const merged = { ...filters, ...newFilters }

    const newSearchParams = new URLSearchParams()

    // brand
    merged.brand?.forEach(b => {
      newSearchParams.append(PARAM_BRAND, b)
    })

    // color
    merged.color?.forEach(c => {
      newSearchParams.append(PARAM_COLOR, c)
    })

    // gender
    merged.gender?.forEach(g => {
      newSearchParams.append(PARAM_GENDER, g)
    })

    // style
    merged.style?.forEach(s => {
      newSearchParams.append(PARAM_STYLE, s)
    })

    // priceRange
    // Aggiungere minPrice e maxPrice solo se non sono presenti nei valori predefiniti.
    if (merged.priceRange) {
      const { min, max } = merged.priceRange
      if (min !== 0 || max !== 1000) {
        newSearchParams.set(PARAM_PRICE_MIN, String(min))
        newSearchParams.set(PARAM_PRICE_MAX, String(max))
      }
    }

    // search
    if (merged.search) {
      newSearchParams.set(PARAM_SEARCH, merged.search)
    }

    // page
    if (merged.page) {
      newSearchParams.set(PARAM_PAGE, String(merged.page))
    }

    // sort
    if (merged.sort) {
      newSearchParams.set(PARAM_SORT, merged.sort)
    }

    // dir
    if (merged.dir) {
      newSearchParams.set(PARAM_DIR, merged.dir)
    }

    // Set search params
    setSearchParams(newSearchParams, { replace: true })
  }

  return {
    filters,
    setFilters
  }
}

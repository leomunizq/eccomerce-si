import type React from 'react'

import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import ProductList from '@/components/products/product-list'
import Pagination from '@/components/products/pagination'
import MainFilters from '@/components/products/main-filters'
import SecondaryFiltersSheet from '@/components/products/secondary-filters-sheet'
import { useProducts } from '@/hooks/products/use-products'
import { SortDirection, SortKey, useUrlFilters } from '@/hooks/use-url-filters'
import { SingleSortSelect } from './sort-order-filter'

export default function ProductsPage() {
  const { filters, setFilters } = useUrlFilters()

  const { data: sneakersData, isLoading } = useProducts({
    brand: filters.brand,
    color: filters.color,
    gender: filters.gender,
    category: filters.style,
    search: filters.search,
    minPrice: filters.priceRange.min,
    maxPrice: filters.priceRange.max,
    page: filters.page,
    limit: 9,
    orderBy: filters.sort,
    orderDirection: filters.dir
  })
  console.log(sneakersData);
  

  const PRODUCTS_PER_PAGE = 9

  const totalPages = Math.ceil((sneakersData?.total || 0) / PRODUCTS_PER_PAGE)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value, page: 1 })
  }

  const handleFilterChange = (
    filterType: string,
    value: string | number | { min: number; max: number } | string[]
  ) => {
    setFilters({ [filterType]: value, page: 1 })
  }

  const handlePageChange = (page: number) => {
    setFilters({ page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSingleSelectChange = (sort: SortKey, dir: SortDirection) => {
    setFilters({ sort, dir, page: 1 })
  }

  function handleClearFilters() {
    setFilters({
      brand: [],
      color: [],
      style: [],
      gender: [],
      priceRange: { min: 0, max: 1000 },
      page: 1
    })
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sneakers Collection</h1>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar sneakers..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <div className="flex flex-row gap-2">
          <SingleSortSelect
            sortKey={filters.sort}
            sortDir={filters.dir}
            onChange={handleSingleSelectChange}
          />
          <SecondaryFiltersSheet
            filters={filters}
            onFilterChange={handleFilterChange}
            clearAllFilters={handleClearFilters}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Filters (Desktop) */}
        <div className="hidden lg:block">
          <MainFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-muted-foreground">
              Showing {sneakersData?.products.length} of {sneakersData?.total} sneakers
            </p>
          </div>
          {isLoading && (
            <div className="flex justify-center items-center h-96">
              <p className="text-lg text-muted-foreground">Loading...</p>
            </div>
          )}
          <ProductList products={sneakersData?.products} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={filters.page || 1}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

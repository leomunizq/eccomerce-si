import { Check, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { genders } from '@/constants/constants'
import { useCategories } from '@/hooks/categories/use-categories'

import { useBrands } from '@/hooks/brands/use-brands'
import { useColors } from '@/hooks/colors/use-colors'
import { Slider } from '../ui/slider'
import { cn } from '@/lib/utils'

interface SecondaryFiltersSheetProps {
  filters: {
    brand: string[]
    priceRange: { min: number; max: number }
    color: string[]
    gender: string[]
    style: string[]
  }
  onFilterChange: (
    filterType: string,
    value: string | number | { min: number; max: number } | string[]
  ) => void
  clearAllFilters: () => void
}

export default function SecondaryFiltersSheet({
  filters,
  onFilterChange,
  clearAllFilters
}: SecondaryFiltersSheetProps) {
  const { data: styles } = useCategories()
  const { data: brands } = useBrands()
  const { data: colors } = useColors()

  const handleGenderChange = (gender: string) => {
    const updatedGenders = filters.gender.includes(gender)
      ? filters.gender.filter(g => g !== gender)
      : [...filters.gender, gender]

    onFilterChange('gender', updatedGenders)
  }

  const handleStyleChange = (style: string) => {
    const updatedStyles = filters.style.includes(style)
      ? filters.style.filter(s => s !== style)
      : [...filters.style, style]

    onFilterChange('style', updatedStyles)
  }

  const hasActiveFilters = () => {
    return (
      filters.brand.length > 0 ||
      filters.color.length > 0 ||
      filters.gender.length > 0 ||
      filters.style.length > 0 ||
      filters.priceRange.min > 0 ||
      filters.priceRange.max < 1000
    )
  }

  const handleBrandChange = (brand: string) => {
    const updatedBrands = filters.brand.includes(brand)
      ? filters.brand.filter(b => b !== brand)
      : [...filters.brand, brand]

    onFilterChange('brand', updatedBrands)
  }

  const handleColorChange = (color: string) => {
    const updatedColors = filters.color.includes(color)
      ? filters.color.filter(c => c !== color)
      : [...filters.color, color]

    onFilterChange('color', updatedColors)
  }

  const handlePriceChange = (value: number[]) => {
    onFilterChange('priceRange', { min: value[0], max: value[1] }) // #todo: implement debounce
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters() && (
            <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
              {filters.brand.length +
                filters.color.length +
                filters.gender.length +
                filters.style.length +
                (filters.priceRange.min > 0 ? 1 : 0) +
                (filters.priceRange.max < 1000 ? 1 : 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-5">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Use the filters below to narrow down your search
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Gender */}
          <div>
            <h4 className="font-medium mb-3">Gender</h4>
            <div className="space-y-2">
              {genders.map(gender => (
                <div key={gender.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gender-${gender.value}`}
                    checked={filters.gender.includes(gender.value)}
                    onCheckedChange={() => handleGenderChange(gender.value)}
                  />
                  <Label
                    htmlFor={`gender-${gender.value}`}
                    className="font-normal cursor-pointer"
                  >
                    {gender.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Categories */}
          <div>
            <h4 className="font-medium mb-3">Style</h4>
            <div className="space-y-2">
              {styles?.map(style => (
                <div key={style.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`style-${style.id}`}
                    checked={filters.style.includes(style.id)}
                    onCheckedChange={() => handleStyleChange(style.id)}
                  />
                  <Label
                    htmlFor={`style-${style.id}`}
                    className="font-normal cursor-pointer"
                  >
                    {style.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-3">Price</h4>
            <div className="px-2">
              <Slider
                value={[filters.priceRange.min, filters.priceRange.max]}
                minStepsBetweenThumbs={10}
                step={10}
                max={1000}
                min={0}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">${filters.priceRange.min}</span>
                <span className="text-sm">${filters.priceRange.max}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Brands */}
          <div>
            <h4 className="font-medium mb-3">Marcas</h4>
            <div className="space-y-2">
              {brands?.map(brand => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.name}`}
                    checked={filters.brand.includes(brand.id)}
                    onCheckedChange={() => handleBrandChange(brand.id)}
                    value={brand.id}
                  />
                  <Label
                    htmlFor={`brand-${brand.name}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Colors */}
          <div>
            <h4 className="font-medium mb-3">Colors</h4>
            <div className="grid grid-cols-3 gap-2">
              {colors?.map(color => (
                <div
                  key={color.id}
                  className="flex flex-col items-center gap-1"
                >
                  <button
                    onClick={() => handleColorChange(color.id)}
                    className={cn(
                      'h-8 w-8 rounded-md border-2 flex items-center justify-center',
                      filters.color.includes(color.id)
                        ? 'border-primary'
                        : 'border-transparent'
                    )}
                    style={{
                      backgroundColor:
                        color.hex_code === '#FFFFFF'
                          ? '#f3f5f8'
                          : color.hex_code
                    }}
                    aria-label={`Cor ${color.name}`}
                  >
                    {filters.color.includes(color.id) && (
                      <Check
                        className={cn(
                          'h-4 w-4',
                          color.hex_code === '#FF0000'
                            ? 'text-white'
                            : 'text-red-500'
                        )}
                      />
                    )}
                  </button>
                  <span className="text-xs">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8 flex-row justify-between">
          <Button variant="outline" onClick={clearAllFilters}>
            Clear Filters
          </Button>
          <SheetClose asChild>
            <Button>Apply</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

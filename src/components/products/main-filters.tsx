import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useBrands } from '@/hooks/brands/use-brands'
import { useColors } from '@/hooks/colors/use-colors'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MainFiltersProps {
  filters: {
    brand: string[]
    priceRange: { min: number; max: number }
    color: string[]
  }
  onFilterChange: (
    filterType: string,
    value: string | number | { min: number; max: number } | string[]
  ) => void
}

export default function MainFilters({
  filters,
  onFilterChange
}: MainFiltersProps) {
  const { data: brands } = useBrands()
  const { data: colors } = useColors()

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
    onFilterChange('priceRange', { min: value[0], max: value[1] }) // #TODO: debounce this
  }

  return (
    <div className="space-y-6 sticky top-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        <Separator className="mb-4" />
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price</h4>
        <div className="px-2">
          <Slider
            value={[filters.priceRange.min, filters.priceRange.max]}
            minStepsBetweenThumbs={10}
            max={1000}
            min={0}
            step={10}
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
        <h4 className="font-medium mb-3">Brands</h4>
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
            <div key={color.id} className="flex flex-col items-center gap-1">
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
                    color.hex_code === '#FFFFFF' ? '#f3f5f8' : color.hex_code
                }}
                aria-label={`color ${color.name}`}
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
  )
}

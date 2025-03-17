import { Facebook, Instagram, Star, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductActions from '@/components/products/product-actions'

export default function ProductInformation({
  productName,
  productPrice,
  productDescription,
  colors,
  isFavorite,
  quantity,
  onToggleFavorite,
  onDecrement,
  onIncrement
}: {
  productName: string
  productPrice: number
  productDescription: string
  colors: {
    color_id?: string | null
    colors: { name: string; hex_code: string } | null
  }[]
  isFavorite: boolean
  quantity: number
  onToggleFavorite: () => void
  onDecrement: () => void
  onIncrement: () => void
}) {
  return (
    <div className="lg:w-1/2 space-y-8 order-2 lg:order-2">
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          {productName}
        </h1>
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} className="w-5 h-5 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-gray-500">(4.5 / 120 reviews)</span>
        </div>
      </div>

      <p className="text-2xl font-semibold">$ {productPrice}</p>

      <p className="text-gray-700 text-lg leading-relaxed">
        {productDescription}
      </p>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Color</h2>
        <div className="flex flex-wrap gap-4">
          {colors?.map(color => (
            <Button
              key={color.colors?.hex_code}
              aria-label={`Color ${color.colors?.hex_code}`}
              className="w-12 h-12 rounded-md border-2 transition-all flex items-center justify-center"
              style={{ backgroundColor: color.colors?.hex_code }}
            />
          ))}
        </div>
      </div>

      <ProductActions
        isFavorite={isFavorite}
        quantity={quantity}
        onToggleFavorite={onToggleFavorite}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
      />

      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Share:</span>
        <button className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Share on Facebook</span>
          <Facebook className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Share on Twitter</span>
          <Twitter className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-gray-500">
          <span className="sr-only">Share on Instagram</span>
          <Instagram className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

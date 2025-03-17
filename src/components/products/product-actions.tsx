import { Heart, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProductActions({
  isFavorite,
  quantity,
  onToggleFavorite,
  onDecrement,
  onIncrement
}: {
  isFavorite: boolean
  quantity: number
  onToggleFavorite: () => void
  onDecrement: () => void
  onIncrement: () => void
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border rounded-full">
        <Button
          role="button"
          aria-label="remove"
          variant="ghost"
          size="icon"
          onClick={onDecrement}
          className="rounded-l-full"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="w-12 text-center">{quantity}</span>
        <Button
          role="button"
          aria-label="add"
          variant="ghost"
          size="icon"
          onClick={onIncrement}
          className="rounded-r-full"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <Button className="flex-grow bg-black text-white hover:bg-gray-900 py-6 text-lg font-medium">
        Add to Cart
      </Button>
      <Button variant="outline" className="p-3" onClick={onToggleFavorite}>
        <Heart
          className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
        />
        <span className="sr-only">Add to Favorites</span>
      </Button>
    </div>
  )
}

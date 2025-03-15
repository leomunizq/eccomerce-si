import { Heart } from 'lucide-react'
import { Product } from '@/services/products/list'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { storerageURL } from '@/constants/constants'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.images?.[0]?.image_url
    ? `${storerageURL}${product.images?.[0]?.image_url}`
    : '/placeholder.svg'
  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageSrc}
          alt={product.name}
          className="object-cover transition-transform group-hover:scale-105"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 left-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>
      <CardContent className="pt-4">
        <div className="text-sm text-muted-foreground mb-1">
          {product.brands?.name}
        </div>
        <h3 className="font-medium truncate">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          {product.price && product.price && (
            <span className="text-red-500 font-semibold">${product.price}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

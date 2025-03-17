import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ProductImageGallery({
  images
}: {
  images: { image_url: string }[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="lg:w-1/2 order-1 lg:order-1 lg:sticky top-24">
      <div className="relative aspect-square">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white"
          onClick={previousImage}
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </Button>

        <div className="relative w-full h-full overflow-hidden rounded-2xl group">
          <img
            width={600}
            height={600}
            src={images[currentIndex]?.image_url || '/placeholder.svg'}
            alt="Product Image"
            className="object-cover transition-all duration-300 group-hover:scale-110"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white"
          onClick={nextImage}
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </Button>
      </div>

      <div className="flex justify-center gap-3 sm:gap-4 mt-6">
        {images.slice(0, 5).map((image, index) => (
          <button
            key={image.image_url}
            onClick={() => setCurrentIndex(index)}
            className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all
              ${currentIndex === index ? 'ring-2 ring-black' : 'hover:ring-1 hover:ring-gray-200'}
            `}
          >
            <img
              src={image.image_url || '/placeholder.svg'}
              alt={`Premium Drink Bottle ${index + 1}`}
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

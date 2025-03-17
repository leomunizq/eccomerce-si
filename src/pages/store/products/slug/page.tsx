import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductById } from '@/hooks/products/use-get-product'
import { storageURL } from '@/constants/constants'
import ProductLoading from '@/components/products/loading'
import ProductDetailsTabs from '@/components/products/product-details-tabs'
import { useProducts } from '@/hooks/products/use-products'
import RelatedProducts from '@/components/products/related-products'
import { shuffle } from '@/lib/utils'
import ProductImageGallery from '@/components/products/product-image-gallery'
import ProductInformation from '@/components/products/product-information'

export default function ProductPage() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()

  const { data: product, isLoading } = useGetProductById(id || '')
  const { data: relatedProductsData } = useProducts({
    limit: 8,
    page: 1,
    category: product?.category_id ? [product.category_id] : []
  })

  const shuffled = shuffle(relatedProductsData?.products || [])
  const randomProducts = shuffled.slice(0, 4)

  if (isLoading) {
    return <ProductLoading />
  }

  const images = product?.images.map(image => ({
    image_url: `${storageURL}/${image.image_url}`
  })) || []

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }
  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col justify-between py-12">
        <div>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
            <ProductImageGallery images={images} />
            <ProductInformation
              productName={product?.name || ''}
              productPrice={product?.price || 0}
              productDescription={product?.description || ''}
              colors={product?.product_colors || []}
              isFavorite={isFavorite}
              quantity={quantity}
              onToggleFavorite={toggleFavorite}
              onDecrement={decrementQuantity}
              onIncrement={incrementQuantity}
            />
          </div>
          <ProductDetailsTabs />
          <RelatedProducts products={randomProducts} />
        </div>
      </main>
    </div>
  )
}

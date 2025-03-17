import { storageURL } from '@/constants/constants'
import { Product } from '@/services/products/list'
import { Link } from 'react-router-dom'

type RelatedProductsProps = {
  products: Product[]
}

export const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (!products) return null

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products?.map(productData => (
          <Link
            key={productData.id}
            className="group"
            to={`/product/${productData.id}`}
          >
            <div className="aspect-square relative overflow-hidden rounded-lg mb-3">
              <img
                src={
                  productData?.images?.[0]?.image_url
                    ? `${storageURL}${productData.images[0].image_url}`
                    : '/placeholder.svg'
                }
                alt={productData.name}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold">{productData.name}</h3>
            <p className="text-gray-600">${productData.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts

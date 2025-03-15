
import ProductCard from "@/components/products/product-card"
import { Product } from "@/services/products/list";

interface ProductListProps {
  products: Product[] | undefined
}

export default function ProductList({ products }: ProductListProps) {
  if (!products) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}


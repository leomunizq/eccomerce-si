import { Skeleton } from "@/components/ui/skeleton"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images Skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="space-y-8">
            <div>
              <Skeleton className="h-12 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2" />
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Skeleton key={star} className="w-6 h-6 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-5 w-32" />
            </div>

            <Skeleton className="h-10 w-32" />

            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>

            {/* Color Selection Skeleton */}
            <div>
              <Skeleton className="h-7 w-24 mb-3" />
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-12 h-12 rounded-full" />
                ))}
              </div>
            </div>

            {/* Size Selection Skeleton */}
            <div>
              <Skeleton className="h-7 w-24 mb-3" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Quantity Skeleton */}
            <div>
              <Skeleton className="h-7 w-24 mb-3" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-32 rounded-full" />
              </div>
            </div>

            {/* Add to Cart and Wishlist Skeleton */}
            <div className="flex space-x-4">
              <Skeleton className="flex-1 h-16 rounded-md" />
              <Skeleton className="w-16 h-16 rounded-md" />
            </div>

            {/* Shipping and Returns Skeleton */}
            <div className="flex items-center space-x-8">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </div>

        {/* Product Details Tabs Skeleton */}
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="details" className="text-lg" disabled>
                Product Details
              </TabsTrigger>
              <TabsTrigger value="specs" className="text-lg" disabled>
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-lg" disabled>
                Reviews
              </TabsTrigger>
            </TabsList>
            <div className="mt-4 space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-5 w-2/3" />
              </div>
            </div>
          </Tabs>
        </div>

        {/* Product Recommendations Skeleton */}
        <div className="mt-24">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((product) => (
              <div key={product} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/3" />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Skeleton */}
        <div className="mt-24 text-center">
          <Skeleton className="h-12 w-1/2 mx-auto mb-6" />
          <Skeleton className="h-14 w-48 mx-auto rounded-md" />
        </div>
      </main>
    </div>
  )
}


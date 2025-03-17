import { useBrands } from '@/hooks/brands/use-brands'
import { useCategories } from '@/hooks/categories/use-categories'
import { useProducts } from '@/hooks/products/use-products'
import { Box, Package, Tag } from 'lucide-react'

export const AdminPage = () => {
  const { data: productsData } = useProducts()
  const { data: brandsData } = useBrands()
  const { data: categoriesData } = useCategories()

  const totalProducts = productsData?.total
  const totalBrands = brandsData?.length
  const totalCategories = categoriesData?.length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-14">
      {totalProducts && (
        <DashboardCard
          title="Total Products"
          value={totalProducts?.toString()}
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
        />
      )}
      {totalBrands && (
        <DashboardCard
          title="Total Brands"
          value={totalBrands.toString()}
          icon={<Tag className="h-4 w-4 text-muted-foreground" />}
        />
      )}
      {totalCategories && (
        <DashboardCard
          title="Total Categories"
          value={totalCategories.toString()}
          icon={<Box className="h-4 w-4 text-muted-foreground" />}
        />
      )}
    </div>
  )
}

export default AdminPage

function DashboardCard({
  title,
  value,
  icon
}: {
  title: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
        {icon}
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  )
}

import { Box, Package, Tag, Users } from "lucide-react"


export const AdminPage = () => {
 
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-14">
      <DashboardCard title="Total Products" value="248" icon={<Package className="h-4 w-4 text-muted-foreground" />} />
      <DashboardCard title="Total Brands" value="36" icon={<Tag className="h-4 w-4 text-muted-foreground" />} />
      <DashboardCard title="Total Categories" value="12" icon={<Box className="h-4 w-4 text-muted-foreground" />} />
      <DashboardCard title="Total Customers" value="1,024" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
    </div>
  )
}

export default AdminPage


function DashboardCard({
  title,
  value,
  icon,
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

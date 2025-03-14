import { Outlet } from 'react-router-dom'
import { AdminSidebar } from '@/components/layout/admin-sidebar'

import { SidebarProvider } from '@/components/ui/sidebar'

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        {/* Sidebar of the admin panel */}
        <AdminSidebar />

        {/* Main content of the admin panel */}
        <div className="flex-1 p-6 md:ml-48">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout

import {  ShoppingBag } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { menuItems } from "@/constants/menu-items";

export function AdminSidebar( ) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar variant="sidebar" >
      <SidebarHeader className="border-b">
        <div className="flex h-16 items-center px-4">
          <ShoppingBag className="mr-2 h-6 w-6" />
          <span className="font-semibold text-lg">Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton  isActive={isActive(item.href)}>
                <Link to={item.href} className="flex items-center gap-4">
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
          
            <div className="text-sm">
              <p className="font-medium">Admin User</p>
              <p className="text-muted-foreground">admin@example.com</p>
            </div>
          </div>
         
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}


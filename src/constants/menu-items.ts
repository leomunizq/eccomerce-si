import { Box, Image, LayoutDashboard, Package, Tag } from "lucide-react"

export const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    id: "dashboard",
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
    id: "products",
  },
  {
    title: "Brands",
    href: "/admin/brands",
    icon: Tag,
    id: "brands",
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Box,
    id: "categories",
  },
  {
    title: "Images",
    href: "/admin/images",
    icon: Image,
    id: "images",
  },
]
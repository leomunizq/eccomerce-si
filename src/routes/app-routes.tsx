import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { AdminPage } from '../pages/admin/home'
import Layout from '../components/layout/layout'
import CreateProduct from '@/pages/admin/products/create/page'
import AdminLayout from '@/components/layout/admin-layout'
import { ProductsView } from '@/pages/admin/products/page'
import { BrandsView } from '@/pages/admin/brands/page'
import { CategoriesView } from '@/pages/admin/categories/page'
import { ImagesView } from '@/pages/admin/images/page'
import EditProduct from '@/pages/admin/products/edit/page'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<h1>home</h1>} />
          <Route path="/products" element={<h1>Products</h1>} />
          <Route path="/product/:id" element={<h1>produto/id</h1>} />
          {/* Redirects routes not found to Home #TODO: 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products/create" element={<CreateProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/products" element={<ProductsView />} />
          <Route path="/admin/brands" element={<BrandsView />} />
          <Route path="/admin/categories" element={<CategoriesView />} />
          <Route path="/admin/images" element={<ImagesView />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default AppRoutes

import { useState } from 'react'
import { Edit, MoreHorizontal, Plus, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'
import { useProducts } from '@/hooks/products/use-products'
import { useDeleteProduct } from '@/hooks/products/use-delete-product'

export function ProductsView() {
  const [searchQuery, setSearchQuery] = useState('')

  const { data: products } = useProducts()
  const { mutate: deleteProductMutate } = useDeleteProduct()

  const handleDeleteProduct = (productId: string) => {
    deleteProductMutate(productId)
  }

  const filteredProducts = products?.filter(
    product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brands?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categories?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Link to="/admin/products/create">
          <Button className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Color</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <Link to={`/admin/products/edit/${product.id}`}>
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell>{product.id.toString().substring(0, 5)}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.gender}</TableCell>
                  <TableCell>{product.categories?.name}</TableCell>
                  <TableCell>{product.brands?.name}</TableCell>
                  <TableCell>
                    {product.product_colors?.map(color => (
                      <Badge
                        key={color.color_id}
                        style={{
                          backgroundColor: color.colors?.hex_code,
                          color:
                            color.colors?.hex_code === '#FFFFFF'
                              ? 'black'
                              : 'white',
                          borderColor:
                            color.colors?.hex_code === '#FFFFFF' ? 'black' : ''
                        }}
                      >
                        {color.colors?.name}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/products/edit/${product.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

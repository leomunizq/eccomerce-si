import type React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useBrands } from '@/hooks/brands/use-brands'
import { Upload, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { ProductFormData, productSchema } from '@/schema/product'
import { useCreateProduct } from '@/hooks/products/use-create-product'
import { useCategories } from '@/hooks/categories/use-categories'
import { useColors } from '@/hooks/colors/use-colors'

interface ImagePreview {
  file: File
  preview: string
}

const CreateProduct = () => {
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([])

  const {
    data: brands,
    isLoading: brandsIsLoading,
    isError: brandsIsError,
    error: brandError
  } = useBrands()
  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
    error: categoriesError
  } = useCategories()

  const {
    data: colors,
    isLoading: colorsIsLoading,
    isError: colorsIsError,
    error: colorError
  } = useColors()
  

  const { mutate: createProduct, isPending, isSuccess } = useCreateProduct()

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      brand_id: '',
      category_id: '',
      gender: 'unisex',
      material: '',
      images: [],
      color: ''
    }
  })

  // useEffect per resettare il modulo e cancellare le immagini (preview) dopo l'invio con successo
  // gestione degli side effect - evita le chiamate di reset durante il rendering.
  useEffect(() => {
    if (isSuccess && form.formState.isSubmitSuccessful) {
      form.reset()
      setImagePreviews([])
    }
  }, [isSuccess, form.formState.isSubmitSuccessful, form])

  const handleSubmitFn = (data: ProductFormData) => {
    createProduct(data)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPreviews: ImagePreview[] = Array.from(e.target.files).map(
        file => ({
          file,
          preview: URL.createObjectURL(file)
        })
      )

      setImagePreviews(prev => {
        const updatedPreviews = [...prev, ...newPreviews]

        form.setValue(
          'images',
          updatedPreviews.map(item => item.file),
          { shouldValidate: true }
        )
        return updatedPreviews
      })

      e.target.value = ''
    }
  }

  const removeImage = (index: number) => {
    setImagePreviews(prev => {
      const removed = prev[index]

      URL.revokeObjectURL(removed.preview)
      const updatedPreviews = prev.filter((_, i) => i !== index)

      form.setValue(
        'images',
        updatedPreviews.map(item => item.file),
        { shouldValidate: true }
      )
      return updatedPreviews
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitFn)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price*</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand*</FormLabel>
                <div className="relative">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={brandsIsLoading || brandsIsError}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            brandsIsLoading ? 'Loading...' : 'Select a brand'
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands?.map(brand => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {brandsIsError && (
                    <p className="text-red-500 text-sm mt-1">
                      Error loading brands. Please try again.{' '}
                      {brandError?.message}
                    </p>
                  )}
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          categoriesIsLoading
                            ? 'Loading...'
                            : 'Select a category'
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {categoriesIsError && (
                  <p className="text-red-500 text-sm mt-1">
                    Error loading categories. Please try again.{' '}
                    {categoriesError?.message}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Cotton, Leather" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          colorsIsLoading ? 'Loading...' : 'Select a color'
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colors?.map(color => (
                       <SelectItem key={color.id} value={color.id}>
                       <div className="flex items-center gap-2">
                         <div
                           className="h-6 w-6 rounded border border-gray-300"
                           style={{ backgroundColor: color.hex_code }}
                         />
                         <span>{color.name}</span>
                       </div>
                     </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {colorsIsError && (
                  <p className="text-red-500 text-sm mt-1">
                    Error loading colors. Please try again.{' '}
                    {colorError?.message}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter product description"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="image-upload"
                      className="flex h-10 cursor-pointer items-center gap-2 rounded-md bg-secondary px-4 text-secondary-foreground hover:bg-primary/90 hover:text-white"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Images</span>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {imagePreviews.length}{' '}
                      {imagePreviews.length === 1 ? 'file' : 'files'} selected
                    </span>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {imagePreviews.map((item, index) => (
                        <div key={index} className="relative">
                          <div className="relative aspect-square overflow-hidden rounded-md border">
                            <img
                              src={item.preview}
                              alt={`Preview ${index}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="default"
                            size="icon"
                            className="absolute -right-2 -top-2 h-6 w-6 rounded-full cursor-pointer bg-destructive-foreground"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3 text-white" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload at least one image of the product. You can upload
                multiple images.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Adding Product...' : 'Add Product'}
        </Button>
      </form>
    </Form>
  )
}

export default CreateProduct

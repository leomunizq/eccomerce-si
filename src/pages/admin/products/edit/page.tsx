import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";

import { useBrands } from "@/hooks/brands/use-brands";
import { useCategories } from "@/hooks/categories/use-categories";
import { useColors } from "@/hooks/colors/use-colors";
import { useGetProductById } from "@/hooks/products/use-get-product";
import { useUpdateProduct } from "@/hooks/products/use-update-product";
import { ProductFormData, productSchema } from "@/schema/product";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Upload, X } from "lucide-react";

interface ImagePreview {
  file: File | null;
  preview: string;
}


export default function EditProduct() {
  const { id } = useParams();

  // Stato locale per memorizzare le immagini che l'utente sta visualizzando (upload + immagini originali)
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);


  // Dependency Inversion
  const { data: product, isError: isProductError, error: productError } = useGetProductById(id!);
  const { data: brands, isLoading: brandsIsLoading, isError: brandsIsError, error: brandError } = useBrands();
  const { data: categories, isLoading: categoriesIsLoading, isError: categoriesIsError, error: categoriesError } = useCategories();
  const { data: colors, isLoading: colorsIsLoading, isError: colorsIsError, error: colorError } = useColors();


  const { mutate: updateProduct, isPending } = useUpdateProduct();


  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: useMemo(
      () => ({
        name: "",
        description: "",
        price: 0,
        brand_id: "",
        category_id: "",
        gender: "unisex",
        material: "",
        images: [],
        color: "",
      }),
      []
    ),
  });

  /* 
    useEffect per compilare il modulo quando:
      - il prodotto è caricato
      - le marche, le categorie e i colori sono disponibili
    SRP:
    garantire che il modulo venga inizializzato solo quando i dati sono pronti.
  */
  useEffect(() => {
    if (product && brands && categories && colors) {
      form.reset({
        name: product.name,
        description: product.description || "",
        price: product.price,
        brand_id: product.brand_id || "",
        category_id: product.category_id || "",
        gender: product.gender as "male" | "female" | "unisex",
        material: product.material || "",
        color: product.product_colors?.[0]?.color_id || "",
      });

      // Set immagini nel prodotto
      setImagePreviews(
        product.images.map((image) => ({
          file: null,
          preview: image.image_url,
        }))
      );
    }
  }, [product, brands, categories, colors, form]);


  const handleSubmitFn = (data: ProductFormData) => {
    updateProduct({
      id: id!,
      ...data,
      description: data.description || "",
      material: data.material || "",
      color: data.color || "",
    });
  };

  // Aggiungi immagini al form e allo stato locale
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newPreviews: ImagePreview[] = Array.from(event.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setImagePreviews((prev) => {
        const updatedPreviews = [...prev, ...newPreviews];

        // Aggiorna il campo images del form, ignorando i campi “null”.
        form.setValue(
          "images",
          updatedPreviews.map((item) => item.file).filter((file): file is File => file !== null),
          { shouldValidate: true }
        );

        return updatedPreviews;
      });

      event.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => {
      const removed = prev[index];
      URL.revokeObjectURL(removed.preview);

      const updatedPreviews = prev.filter((_, i) => i !== index);

      form.setValue(
        "images",
        updatedPreviews.map((item) => item.file).filter((file): file is File => file !== null),
        { shouldValidate: true }
      );
      return updatedPreviews;
    });
  };

if (isProductError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500 text-lg">Error loading product. {productError?.message}</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitFn)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Nome do produto */}
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

          {/* Preço */}
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

          {/* Marca */}
          <FormField
            control={form.control}
            name="brand_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand*</FormLabel>
                <div className="relative">
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
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

                  {/* Mensagem de erro de carregamento de marca */}
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

          {/* Categoria */}
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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

          {/* Gênero */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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

          {/* Material */}
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

          {/* Cor */}
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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
                              src={
                                item.preview.startsWith('blob:')
                                  ? item.preview
                                  : `https://pgfbhiwwlzskeydalezn.supabase.co/storage/v1/object/public/photos/${item.preview}`
                              }
                              alt={`Product Image ${index + 1}`}
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
          {isPending ? 'Updating Product...' : 'Update Product'}
        </Button>
      </form>
    </Form>
  )
}

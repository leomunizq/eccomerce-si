import { useState, useMemo } from 'react'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetImages } from '@/hooks/images/use-images'
import { useDeleteImage } from '@/hooks/images/use-delete-image'
import { cleanImageName } from '@/lib/utils'
import { Tables } from '@/types/supabase'
import { CreateImageDialogTrigger } from '@/components/create-image-dialog-trigger'
import { useFilteredImages } from '@/hooks/use-filtered-images'


// DRY 
enum ImageTab {
  PRODUCT = 'product',
  CATEGORY = 'category',
  BANNER = 'banner',
  BRAND = 'brand',
}

type Image = Tables<'images'>

// Componente principale che gestisce la visualizzazione delle immagini
export function ImagesView() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: images, isError, isLoading } = useGetImages()

  // Utilizza il custom hook per applicare la logica di filtraggio.
  const filteredImages = useFilteredImages(images, searchQuery)

  // Utilizza useMemo per memorizzare i risultati filtrati in modo efficiente.
  const productImages = useMemo(
    () => filteredImages.filter(image => image.type === ImageTab.PRODUCT),
    [filteredImages]
  )
  const categoryImages = useMemo(
    () => filteredImages.filter(image => image.type === ImageTab.CATEGORY),
    [filteredImages]
  )
  const bannerImages = useMemo(
    () => filteredImages.filter(image => image.type === ImageTab.BANNER),
    [filteredImages]
  )
  const brandImages = useMemo(
    () => filteredImages.filter(image => image.type === ImageTab.BRAND),
    [filteredImages]
  )

  const statusMessage = isError
  ? 'An error occurred while searching for images.'
  : isLoading
    ? 'Loading images...'
    : 'No images found.'

  return (
    <div className="space-y-4">
      {/* Sezione ricerca e creazione di immagini */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search images..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <CreateImageDialogTrigger />
      </div>

      <Tabs defaultValue="all" className="w-full">
        {/* tabs per la selezione dei tipi di immagine */}
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value={ImageTab.PRODUCT}>Products</TabsTrigger>
          <TabsTrigger value={ImageTab.CATEGORY}>Categories</TabsTrigger>
          <TabsTrigger value={ImageTab.BANNER}>Banners</TabsTrigger>
          <TabsTrigger value={ImageTab.BRAND}>Brands</TabsTrigger>
        </TabsList>

        {/* tabs per il contenuto delle immagini */}
        <ImageTabContent tabValue="all" images={filteredImages} statusMessage={statusMessage} />
        <ImageTabContent tabValue={ImageTab.PRODUCT} images={productImages} statusMessage={statusMessage} />
        <ImageTabContent tabValue={ImageTab.CATEGORY} images={categoryImages} statusMessage={statusMessage} />
        <ImageTabContent tabValue={ImageTab.BANNER} images={bannerImages} statusMessage={statusMessage} />
        <ImageTabContent tabValue={ImageTab.BRAND} images={brandImages} statusMessage={statusMessage} />
      </Tabs>
    </div>
  )
}


// Componente per il rendering della griglia di immagini
function ImageGrid({ images, statusMessage }: { images: Image[]; statusMessage: string }) {
  if (images.length === 0) return <StatusMessage message={statusMessage} />
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map(image => (
        <ImageCard key={image.id} {...image} />
      ))}
    </div>
  )
}

// Componente generico per incapsulare il contenuto di ogni tab
function ImageTabContent({
  tabValue,
  images,
  statusMessage,
}: {
  tabValue: string
  images: Image[]
  statusMessage: string
}) {
  return (
    <TabsContent value={tabValue} className="mt-4">
      <ImageGrid images={images} statusMessage={statusMessage} />
    </TabsContent>
  )
}


// (SRP) - il componente si occupa solo della visualizzazione della scheda.
// L'uso dell'hook useDeleteImage dimostra l'inversione di dipendenza, disaccoppiando la logica di cancellazione dall'interfaccia utente.
function ImageCard({ image_url, size, id }: Image) {
  const { mutate: deleteImageMutate } = useDeleteImage()

  const handleDelete = () => {
    deleteImageMutate({ imageId: id, image_url })
  }

  const imageSrc = image_url
    ? `https://pgfbhiwwlzskeydalezn.supabase.co/storage/v1/object/public/photos//${image_url}`
    : '/placeholder.svg'

  return (
    <div className="group relative rounded-md border bg-card overflow-hidden">
      <div className="aspect-square relative">
        <img src={imageSrc} alt={image_url} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            <Trash className="h-4 w-4 text-black" />
          </Button>
        </div>
      </div>
      <div className="p-2">
        <p className="text-sm font-medium truncate" title={image_url}>
          {cleanImageName(image_url)}
        </p>
        <p className="text-xs text-muted-foreground">{size}</p>
      </div>
    </div>
  )
}

function StatusMessage({ message }: { message: string }) {
  return (
    <div className="h-24 flex items-center justify-center text-muted-foreground">
      {message}
    </div>
  )
}

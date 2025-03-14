
import { useCreateImage } from '@/hooks/images/use-create-image'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { ImageFormData, imageFormSchema } from '@/schema/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { Input } from '@/components/ui/input'


const types = [
  { id: 'product', name: 'Product' },
  { id: 'category', name: 'Category' },
  { id: 'banner', name: 'Banner' },
  { id: 'brand', name: 'Brand' }
]

export function CreateImageDialogTrigger() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const form = useForm<ImageFormData>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      type: ''
    }
  })

  const { mutate: createImage, isPending } = useCreateImage()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const onSubmit = async (data: ImageFormData) => {
    if (!selectedFile || !data.type) {
      return
    }

    createImage(
      { file: selectedFile, type: data.type },
      {
        onSuccess: () => {
          form.reset()
          setSelectedFile(null)
          setPreviewUrl(null)
          setIsDialogOpen(false)
        }
      }
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Fill in the form below to upload a new image.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Upload Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hover:bg-accent"
              />
              {previewUrl && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-32 rounded-md border shadow-sm"
                  />
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Image'}
              </Button>
            </DialogFooter>
          </form>
        </Form>

        {form.formState.errors.type && (
          <p className="text-red-500">{form.formState.errors.type.message}</p>
        )}
      </DialogContent>
    </Dialog>
  )
}

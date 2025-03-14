import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useCreateBrand } from "@/hooks/brands/use-create-brand"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export const CreateBrandDialogTrigger = () => {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: { name: '' }
  })
  const { mutate: createBrand, isPending } = useCreateBrand()

  const onSubmit = (data: { name: string }) => {
    createBrand(data, {
      onSuccess: () => reset()
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Brand
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Brand</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new brand.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Brand Name
            </Label>
            <Input
              id="name"
              defaultValue="Nike"
              className="col-span-3"
              {...register('name', { required: true })}
            />
            {formState.errors.name && (
              <p className="text-red-500">{formState.errors.name.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Brand'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default CreateBrandDialogTrigger
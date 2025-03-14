import { useUpdateBrand } from '@/hooks/brands/use-update-brand'
import { brandSchema } from '@/schema/brand'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { Input } from '@/components/ui/input'
type EditBrandProps = {
  brandId: string
  currentName: string
}

export const EditBrandDialogTrigger = ({
  brandId,
  currentName
}: EditBrandProps) => {
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(brandSchema),
    defaultValues: { name: currentName }
  })

  const { mutate: updateBrand, isPending } = useUpdateBrand()

  const onSubmit = (data: { name: string }) => {
    updateBrand(
      { brandId, newName: data.name },
      { onSuccess: () => reset({ name: data.name }) }
    )
  }

  return (
    <DropdownMenuItem asChild>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full rounded-sm h-8 px-2 py-1.5 justify-start"
            onClick={() => reset()}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Brand</DialogTitle>
            <DialogDescription>
              Fill in the form below to update the brand
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Brand Name
              </Label>
              <Input
                id="name"
                placeholder="Enter brand name"
                className="col-span-3"
                {...register('name', { required: true })}
              />
            </div>

            {formState.errors.name && (
              <p className="text-red-500">{formState.errors.name.message}</p>
            )}

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Updating...' : 'Update Brand'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DropdownMenuItem>
  )
}

export default EditBrandDialogTrigger

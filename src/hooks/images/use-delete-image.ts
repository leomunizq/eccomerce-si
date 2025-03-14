import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'

import deleteImage from '@/services/images/delete'

export const useDeleteImage = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({imageId, image_url}: {imageId: string, image_url: string }) => {
      // 🛡️  Display a confirmation alert before deleting
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this image?'
      )
      if (!confirmDelete) throw new Error('Action cancelled by user.')

      return await deleteImage({
        id: imageId,
        image_url: image_url
      })
    },
    onSuccess: data => {
      toast({
        title: 'Image deleted!',
        description: data?.name
          ? `${data.name} has been deleted.`
          : 'Image has been deleted.'
      })

      queryClient.invalidateQueries({ queryKey: ['images'] })
    },
    onError: error => {
      let errorMessage = 'There was an error deleting the Image'

      // If the error is a Supabase object,  try to extract the correct message
      if (typeof error === 'object' && error !== null) {
        if ('message' in error && typeof error.message === 'string') {
          errorMessage = error.message
        } else if (
          'error_description' in error &&
          typeof error.error_description === 'string'
        ) {
          errorMessage = error.error_description
        }
      }

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      })
    }
  })
}

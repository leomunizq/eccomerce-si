import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'

import createImage from '@/services/images/create'

export const useCreateImage = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: createImage,
    onSuccess: () => {
      toast({
        title: 'Image added',
        description: `Image has been added to your store.`
      })
      queryClient.invalidateQueries({ queryKey: ['images'] })
    },
    onError: error => {
      toast({
        title: 'Error',
        description: `There was an error adding the image: ${error}`,
        variant: 'destructive'
      })
    }
  })
}

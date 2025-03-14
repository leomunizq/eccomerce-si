import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'
import createBrand from '@/services/brands/create'

export const useCreateBrand = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: createBrand,
    onSuccess: data => {
      toast({
        title: 'Brand added',
        description: `${data.name} has been added to your store.`
      })
      queryClient.invalidateQueries({ queryKey: ['brands'] })
    },
    onError: error => {
      console.error('Error creating brand:', error)
      toast({
        title: 'Error',
        description: 'There was an error adding the brand.',
        variant: 'destructive'
      })
    }
  })
}

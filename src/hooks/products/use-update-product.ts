import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import { updateProduct } from "@/services/products/update";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation ({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      toast({
        title: "Product updated!",
        description: `${data.name} has been updated.`,
      });

       
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `There was an error updating the product. ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

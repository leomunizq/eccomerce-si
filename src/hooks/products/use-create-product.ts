import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/services/products/create";

import { useToast } from "@/hooks/use-toast";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast({
        title: "Product added",
        description: `${data.name} has been added to your store.`,
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (error) => {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: "There was an error adding the product.",
        variant: "destructive",
      });
    },
  });
};

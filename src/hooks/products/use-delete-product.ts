import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '@/services/products/delete';
import { useToast } from '@/hooks/use-toast'



export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (productId: string) => {
      // 🛡️  Display a confirmation alert before deleting
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) throw new Error("Action cancelled by user.");

      return await deleteProduct({ productId: productId });
    },
    onSuccess: (data) => {
      toast({
        title: "Product deleted!",
        description: data?.name ? `${data.name} has been deleted.` : "Product has been deleted.",
      });

      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
   onError: (error) => {
      console.error("Delete product error:", error);

      let errorMessage = "There was an error deleting the product.";
      
      // If the error is a Supabase object,  try to extract the correct message
      if (typeof error === "object" && error !== null) {
        if ("message" in error && typeof error.message === "string") {
          errorMessage = error.message;
        } else if ("error_description" in error && typeof error.error_description === "string") {
          errorMessage = error.error_description;
        }
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'

import deleteBrand from '@/services/brands/delete'

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (brandId: string) => {
      // 🛡️  Display a confirmation alert before deleting
      const confirmDelete = window.confirm("Are you sure you want to delete this brand?");
      if (!confirmDelete) throw new Error("Action cancelled by user.");

      return await deleteBrand(brandId);
    },
    onSuccess: (data) => {
      toast({
        title: "Brand deleted!",
        description: data?.name ? `${data.name} has been deleted.` : "Brand has been deleted.",
      });

      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
   onError: (error) => {
      console.error("Delete brand error:", error);

      let errorMessage = "There was an error deleting the brand.";
      
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

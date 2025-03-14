import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import updateBrand from "@/services/brands/update";

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: updateBrand,
    onSuccess: (data) => {
      toast({
        title: "Brand updated!",
        description: `${data.name} has been updated.`,
      });

       
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `There was an error updating the brand. ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

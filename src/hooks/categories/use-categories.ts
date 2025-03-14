import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categories/list";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });
};

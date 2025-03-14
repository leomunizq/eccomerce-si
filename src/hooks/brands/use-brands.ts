import { getBrands } from "@/services/brands/list";
import { useQuery } from "@tanstack/react-query";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 1000 * 60 * 5,
  });
};
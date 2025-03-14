import { getProducts } from "@/services/products/list";
import { useQuery } from "@tanstack/react-query";


export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });
};
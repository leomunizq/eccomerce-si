import { getProducts, GetProductsParams } from "@/services/products/list";
import { useQuery } from "@tanstack/react-query";


export function useProducts(params?: GetProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};
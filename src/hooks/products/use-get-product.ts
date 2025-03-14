import { getProductById } from "@/services/products/get-product-by-id";
import { useQuery } from "@tanstack/react-query";


export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById({ id }),
    staleTime: 1000 * 60 * 5,
  });
};
import { useQuery } from "@tanstack/react-query";
import { getImages } from "@/services/images/list";

export const useGetImages = () => {
  return useQuery({
    queryKey: ["images"],
    queryFn: getImages,
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });
};

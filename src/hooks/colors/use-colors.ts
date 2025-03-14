import { useQuery } from "@tanstack/react-query";
import { getColors } from "@/services/colors/list";

export const useColors = () => {
  return useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });
};

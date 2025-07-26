import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetcher function accepts category ID
const fetchAllCategories = async () => {
  try {
    const res = await axiosInstance.get(`/api/category`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useFetchAllCategories = () => {
  return useQuery({
    queryFn: () => fetchAllCategories(),
    queryKey: [`ALL_CATEGORIES`],
  });
};

const createCategory = async (data) => {
  try {
    const res = await axiosInstance.post("api/admin/category", data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: (response) => {
      queryClient.setQueryData(["ALL_CATEGORIES"], (oldData) => {
        if (response.success) {
          const category = { ...response.result, skills: [] };
          return [category, ...oldData];
        }
      });
    },
  });
};

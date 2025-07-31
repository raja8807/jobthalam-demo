import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetcher function accepts category ID
const fetchPackages = async () => {
  try {
    const res = await axiosInstance.get(`/api/candidate/package`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useFetchPackages = () => {
  return useQuery({
    queryFn: fetchPackages,
    queryKey: [`PACKAGES`],
  });
};

import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchHighlightedJobs = async () => {
  try {
    const res = await axiosInstance.get("/api/home/jobs");
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useFetchHighlightedJobs = () => {
  return useQuery({
    queryFn: () => fetchHighlightedJobs(),
    queryKey: [`HIGHLIGHTED_JOBS`],
  });
};

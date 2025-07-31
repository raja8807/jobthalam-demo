// 28d6423c-298b-43fb-bc09-e92982de1fef

import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

// Fetcher function accepts category ID
const fetchFeaturedJobs = async (candidateId) => {
  try {
    const res = await axiosInstance.get(`/api/candidate/jobs/${candidateId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useFetchFeaturedJobs = (candidateId) => {
  return useQuery({
    queryFn: () => fetchFeaturedJobs(candidateId),
    queryKey: [`CANDIDATE_FEATURED_JOBS`, candidateId],
  });
};

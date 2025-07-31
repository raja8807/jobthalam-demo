import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetcher function accepts category ID
const fetchJobRequests = async (candidateId) => {
  try {
    const res = await axiosInstance.get(
      `/api/candidate/request/${candidateId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useFetchJobRequests = (candidateId) => {
  return useQuery({
    queryFn: () => fetchJobRequests(candidateId),
    queryKey: [`JOB_REQUESTS`, candidateId],
  });
};

// Fetcher function accepts category ID
const createJobRequests = async (data) => {
  try {
    const res = await axiosInstance.post(`/api/candidate/request`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useCreateJobRequests = () => {
  return useMutation({
    mutationFn: createJobRequests,
  });
};

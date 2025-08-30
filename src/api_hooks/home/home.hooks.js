import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";

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

const URL = "/api/home/intershipEnquiry";

const createIntershipEnquirySubmission = async (data) => {
  try {
    return await axiosInstance.post(URL, data);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateIntershipEnquirySubmission = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createIntershipEnquirySubmission,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

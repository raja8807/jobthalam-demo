import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/featured_job";

const fetchFeaturedJobsById = async (uid) => {
  try {
    return await axios.get(`${URL}/${uid}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchFeaturedJobsById = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: fetchFeaturedJobsById,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const createBulkFeaturedJobs = async ({ jobsToSend, request }) => {
  try {
    return await axios.post(`${URL}`, {
      jobsToSend,
      request,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateBulkFeaturedJobs = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createBulkFeaturedJobs,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["ALL_REQUESTS"],
        });
      },
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

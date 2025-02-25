import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/job";

const fetchAllJobs = async () => {
  try {
    return await axios.get(`${URL}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchAllJobs = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: fetchAllJobs,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const updateJob = async (job) => {
  try {
    return await axios.put(`${URL}`, {
      job,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useUpdateEmployerJob = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: updateJob,
      onSuccess: (x) => {
        queryClient.invalidateQueries({
          queryKey: ["ALL_EMPLOYERS"],
        });
      },
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

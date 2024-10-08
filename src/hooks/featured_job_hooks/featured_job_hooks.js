import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/featured_job";

const fetchFeaturedJobsByUid = async (uid) => {
  try {
    return await axios.get(`${URL}/${uid}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchFeaturedJobsByUid = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: fetchFeaturedJobsByUid,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const updateFeaturedJobs = async (featuredJob) => {
  try {
    return await axios.put(`${URL}/${featuredJob.id}`, {
      status: featuredJob.status,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useUpdateFeaturedJobs = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: updateFeaturedJobs,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

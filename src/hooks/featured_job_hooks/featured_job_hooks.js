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

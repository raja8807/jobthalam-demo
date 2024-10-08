import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/request";

const createRequest = async ({ request, currentUser }) => {
  try {
    return await axios.post(URL, {
      request,
      currentUser,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateRequest = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createRequest,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const fetchRequestByUid = async (uid) => {
  try {
    return await axios.get(`${URL}/${uid}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchRequestByUid = (uid) => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: fetchRequestByUid,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/application";

const createApplication = async (Application) => {
  try {
    return await axios.post(URL, Application);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateApplication = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createApplication,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const fetchApplicationByUid = async (uid) => {
  try {
    return await axios.post(`${URL}/${uid}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchApplicationByUid = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: fetchApplicationByUid,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

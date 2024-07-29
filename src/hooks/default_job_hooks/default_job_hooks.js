import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/default_job";

const fetchAllDefaultJobs = async () => {
  try {
    return await axios.get(`${URL}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchAllDefaultJobs = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: fetchAllDefaultJobs,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const createDefaultJobs = async (DefaultJobs) => {
  try {
    return await axios.post(`${URL}`, {
      jobs: DefaultJobs,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateDefaultJob = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createDefaultJobs,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};
const deleteDefaultJobs = async (uid) => {
  try {
    return await axios.delete(`${URL}/${uid}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useDeleteDefaultJob = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: deleteDefaultJobs,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

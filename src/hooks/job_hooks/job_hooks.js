import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/job";

const fetchJobByUid = async (uid) => {
  try {
    return await axios.post(`${URL}/${uid}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchJobByUid = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: fetchJobByUid,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const createJob = async (data) => {
  try {
    return await axios.post(URL, data);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateJob = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createJob,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const updateJob = async (Job) => {
  try {
    return await axios.put(`${URL}/${Job.id}`, Job);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useUpdateJob = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: updateJob,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

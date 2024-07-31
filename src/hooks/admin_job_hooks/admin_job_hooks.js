import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/admin_job";

const fetchAllAdminJobs = async () => {
  try {
    return await axios.get(`${URL}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchAllAdminJobs = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: fetchAllAdminJobs,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const createAdminJob = async (adminJob) => {
  try {
    return await axios.post(`${URL}`, adminJob);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateAdminJob = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createAdminJob,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};
const createBulkAdminJob = async (adminJobs) => {
  try {
    return await axios.post(`${URL}/bulk`, {
      jobs: adminJobs,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateBulkAdminJob = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createBulkAdminJob,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const updateAdminJob = async (adminJob) => {
  try {
    return await axios.put(`${URL}/${adminJob.id}`, adminJob);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useUpdateAdminJob = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: updateAdminJob,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

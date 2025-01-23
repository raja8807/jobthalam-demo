import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
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
  const { isPending, error, isSuccess, data, isError, isFetching } = useQuery({
    queryKey: ["ADMIN_JOBS"],
    queryFn: fetchAllAdminJobs,
  });

  return { isLoading: isPending, error, isSuccess, data, isError, isFetching };
};

const createAdminJob = async (adminJob) => {
  try {
    return await axios.post(`${URL}`, adminJob);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateAdminJob = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createAdminJob,
      onSuccess: () => {
        queryClient.invalidateQueries(["ADMIN_JOBS"]);
      },
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

const updateBulkAdminJob = async ({ adminJobs, employerJobs }) => {
  try {
    return await axios.post(`${URL}/update`, {
      adminJobs: adminJobs,
      employerJobs: employerJobs,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useUpdateBulkAdminJob = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: updateBulkAdminJob,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const deleteAdminJob = async (adminJobId) => {
  try {
    return await axios.delete(`${URL}/${adminJobId}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useDeleteAdminJob = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: deleteAdminJob,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

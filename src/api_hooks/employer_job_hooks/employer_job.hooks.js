import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetcher function accepts category ID
const fetchEmployerJobs = async (employer_id) => {
  try {
    const res = await axiosInstance.get(`/api/employer/job/${employer_id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useFetchEmployerJobs = (employer_id) => {
  return useQuery({
    queryFn: () => fetchEmployerJobs(employer_id),
    queryKey: [`EMPLOYER_JOBS`, employer_id],
  });
};

const createEmployerJob = async (employerJob) => {
  try {
    const res = await axiosInstance.post("api/employer/job", employerJob);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useCreateEmployerJob = (employer_id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployerJob,
    onSuccess: (response) => {
      queryClient.setQueryData([`EMPLOYER_JOBS`, employer_id], (oldData) => {
        if (response.success) {
          return [response.job, ...oldData];
        }
      });
    },
  });
};

const upadteEmployerJob = async (employerJob) => {
  try {
    const res = await axiosInstance.put("api/employer/job", employerJob);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useUpadteEmployerJob = (employer_id, index) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upadteEmployerJob,
    onSuccess: (response) => {
      queryClient.setQueryData([`EMPLOYER_JOBS`, employer_id], (oldData) => {
        if (response.success) {
          const newData = [...oldData];
          newData[index] = response.job;
          return newData;
        }
      });
    },
  });
};

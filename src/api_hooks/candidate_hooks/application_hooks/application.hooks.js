import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createApplication = async (data) => {
  try {
    const res = await axiosInstance.post(
      "api/candidate/jobs/application",
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const useCreateApplication = (candidateId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries([`CANDIDATE_FEATURED_JOBS`, candidateId]);
    },
  });
};

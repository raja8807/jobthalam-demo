import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createCandidate = async (data) => {
  try {
    const res = await axiosInstance.post("api/candidate", data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useCreateCandidate = () => {
  return useMutation({
    mutationFn: createCandidate,
  });
};

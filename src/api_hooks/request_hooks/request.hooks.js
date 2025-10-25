import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetcher function accepts category ID
const fetchJobRequests = async (candidateId) => {
  try {
    const res = await axiosInstance.get(
      `/api/candidate/request/${candidateId}`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useFetchJobRequests = (candidateId) => {
  return useQuery({
    queryFn: () => fetchJobRequests(candidateId),
    queryKey: [`JOB_REQUESTS`, candidateId],
  });
};

// Fetcher function accepts category ID
const initiateRequestPayment = async (data) => {
  try {
    const res = await axiosInstance.post(`/api/payment/initiate`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useInitiateRequestPayment = () => {
  return useMutation({
    mutationFn: initiateRequestPayment,
  });
};

const checkPaymentStatusAndSendJob = async (paymentId) => {
  try {
    const res = await axiosInstance.post(`/api/payment/status`, {
      paymentId,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useCheckPaymentStatusAndSendJob = (candidateId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: checkPaymentStatusAndSendJob,
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries([`CANDIDATE_FEATURED_JOBS`, candidateId]);
    },
  });
};

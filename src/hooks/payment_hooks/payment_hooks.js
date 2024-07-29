import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/payment";

const createPayment = async (Payment) => {
  try {
    return await axios.post(URL, Payment);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreatePayment = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createPayment,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const fetchPaymentByUid = async (uid) => {
  try {
    return await axios.get(`${URL}/${uid}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchPaymentByUid = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: fetchPaymentByUid,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

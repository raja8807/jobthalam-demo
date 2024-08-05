import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/payment";

const createPayment = async (data) => {
  try {
    return await axios.post(URL, data);
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

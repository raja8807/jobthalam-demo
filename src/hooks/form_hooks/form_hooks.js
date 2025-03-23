import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/form/internship";

const createSubmission = async (data) => {
  try {
    return await axios.post(URL, data);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateSubmission = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createSubmission,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

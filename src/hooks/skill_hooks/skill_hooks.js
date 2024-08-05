import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/skill";

const fetchSkills = async () => {
  try {
    return await axios.get(`${URL}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchSkills = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: fetchSkills,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

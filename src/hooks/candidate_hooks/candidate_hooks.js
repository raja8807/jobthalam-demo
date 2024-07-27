import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/candidate";

const fetchCandidateByUid = async (uid) => {
  try {
    return await axios.get(`${URL}/${uid}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchCandidateByUid = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: fetchCandidateByUid,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

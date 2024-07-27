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

const createCandidate = async (candidate) => {
  try {
    return await axios.post(URL, candidate);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateCandidate = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createCandidate,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const updateCandidate = async (candidate) => {
  try {
    return await axios.put(`${URL}/${candidate.id}`, candidate);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useUpdateCandidate = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: updateCandidate,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

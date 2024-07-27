import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/employer";

const fetchEmployerByUid = async (uid) => {
  try {
    return await axios.get(`${URL}/${uid}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchEmployerByUid = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: fetchEmployerByUid,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const createEmployer = async (Employer) => {
  try {
    return await axios.post(URL, Employer);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateEmployer = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createEmployer,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const updateEmployer = async (Employer) => {
  try {
    return await axios.put(`${URL}/${Employer.id}`, Employer);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useUpdateEmployer = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: updateEmployer,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

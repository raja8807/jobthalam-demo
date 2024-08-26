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

const createBulkSkills = async (skills) => {
  try {
    return await axios.post(`${URL}`, {
      skills,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateBulkSkills = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createBulkSkills,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};
const deleteSkill = async (id) => {
  try {
    return await axios.delete(`${URL}/${id}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useDeleteSkill = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: deleteSkill,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};
const deleteIndustry = async ({ industry }) => {
  try {
    return await axios.put(`${URL}`, {
      industry,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useDeleteIndustry = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: deleteIndustry,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

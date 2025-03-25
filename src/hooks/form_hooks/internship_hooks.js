import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/forms/internships";

const fetchAllSubmissions = async () => {
  try {
    return await axios.get(`${URL}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchAllSubmissions = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } = useQuery({
    queryFn: fetchAllSubmissions,
    queryKey: ["INTERNSHIP_SUBMISSIONS"],
  });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const deleteBulkInternshipSubmissions = async (ids) => {
  try {
    return await axios.post(`${URL}/delete`, {
      ids,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useDeleteBulkInternshipSubmissions = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: deleteBulkInternshipSubmissions,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

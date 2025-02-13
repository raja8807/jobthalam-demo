import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/skill";

const getIndustryList = async () => {
  try {
    const response = await axios.get("/api/skill/industry");
    return response.data; // Ensure you return the actual data, not the entire response
  } catch (err) {
    throw new Error(err.message);
  }
};

const useIndustryList = () => {
  // Corrected useQuery call
  const queryResult = useQuery({
    queryKey: ["INDUSTRY_LIST"], // queryKey should be an array

    queryFn: getIndustryList,

    // queryFn takes the function directly
  });

  return queryResult;
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
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createBulkSkills,
      onSuccess: (x) => {
        queryClient.invalidateQueries({
          queryKey: ["INDUSTRY_LIST", "ALL_SKILLS"],
        });
      },
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const deleteIndustry = async (industry) => {
  try {
    return await axios.delete(`/api/skill/industry/${industry.industry}`, {
      industry,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useDeleteIndustry = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: deleteIndustry,
      onSuccess: (x) => {
        queryClient.invalidateQueries({
          queryKey: ["INDUSTRY_LIST"],
        });
      },
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const activateIndustry = async (industry) => {
  try {
    return await axios.patch(`/api/skill/industry/${industry.industry}`, {
      industry,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useActivateIndustry = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: activateIndustry,
      onSuccess: (x) => {
        queryClient.invalidateQueries({
          queryKey: ["INDUSTRY_LIST"],
        });
      },
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

const fetchSkills = async () => {
  try {
    return await axios.get(`${URL}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchAllSkills = () => {
  const { isPending, error, isSuccess, data, isError, isFetching } = useQuery({
    queryKey: ["ALL_SKILLS"],
    queryFn: fetchSkills,
  });

  return { isLoading: isPending, error, isSuccess, data, isError, isFetching };
};

const updateBulkSkills = async (skills) => {
  try {
    return await axios.patch(`/api/skill`, {
      skills,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useUpdateBulkSkills = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: updateBulkSkills,
      onSuccess: (x) => {
        queryClient.invalidateQueries({
          queryKey: ["ALL_SKILLS"],
        });
      },
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};

export default useIndustryList;

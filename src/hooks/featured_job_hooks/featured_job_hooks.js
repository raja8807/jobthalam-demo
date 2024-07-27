import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/featured_job";

// const fetchAllAdminJobs = async () => {
//   try {
//     return await axios.get(`${URL}`);
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// export const useFetchAllAdminJobs = () => {
//   const { mutateAsync, isPending, error, isSuccess, data, isError } =
//     useMutation({
//       mutationFn: fetchAllAdminJobs,
//     });

//   return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
// };

const createBulkFeaturedJobs = async (featuredJobs) => {
  try {
    return await axios.post(`${URL}`, {
        featuredJobs
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useCreateBulkFeaturedJobs = () => {
  const { mutateAsync, isPending, error, isSuccess, data, isError } =
    useMutation({
      mutationFn: createBulkFeaturedJobs,
    });

  return { mutateAsync, isLoading: isPending, error, isSuccess, data, isError };
};


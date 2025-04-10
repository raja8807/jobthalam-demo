import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchHomePageJobs = async () => {
  try {
    return await axios.get(`/api/home/jobs`);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const useFetchHomePageJobs = () => {
  const { isLoading, data, error } = useQuery({
    queryFn: fetchHomePageJobs,
    queryKey: ["HOME_PAGE_JOBS"],
  });

  return { isLoading, data, error };
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/employer";

const fetchAllEmployer = async () => {
  try {
    return await axios.get(`${URL}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

const useFetchAllEmployers = () => {
  // Corrected useQuery call
  const queryResult = useQuery({
    queryKey: ["ALL_EMPLOYERS"], // queryKey should be an array

    queryFn: fetchAllEmployer,

    // queryFn takes the function directly
  });

  return queryResult;
};


export default useFetchAllEmployers;

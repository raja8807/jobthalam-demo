import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const URL = "/api/request";

const getAllRequests = async () => {
  try {
    const response = await axios.get(URL);
    return response.data; // Ensure you return the actual data, not the entire response
  } catch (err) {
    throw new Error(err.message);
  }
};

const useAllRequests = () => {
  // Corrected useQuery call
  const queryResult = useQuery({
    queryKey: ["ALL_REQUESTS"], // queryKey should be an array
    queryFn: getAllRequests,

    // queryFn takes the function directly
  });

  return queryResult;
};

export default useAllRequests;

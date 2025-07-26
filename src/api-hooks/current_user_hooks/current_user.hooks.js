import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

// Fetcher function accepts category ID
export const getCurrentEmployerUser = async () => {
  try {
    const res = await axiosInstance.get(`/api/employer/currentUser`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

// Fetcher function accepts category ID
const sendOtp = async ({ mobile, isTestMode }) => {
  try {
    const res = await axiosInstance.post(`/api/auth/otp/send`, {
      mobile,
      send: !isTestMode,
    });
    return res.data;
  } catch (err) {
    console.log(err.message);

    throw err;
  }
};

export const useSendOtp = () => {
  const { mutateAsync, isPending, status } = useMutation({
    mutationFn: sendOtp,
  });

  return { mutateAsync, isPending, status };
};

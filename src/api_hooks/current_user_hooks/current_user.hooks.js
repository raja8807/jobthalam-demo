import axiosInstance from "@/utils/axiosInstance";

// Fetcher function accepts category ID
export const getCurrentCandidateUser = async () => {
  try {
    const res = await axiosInstance.get(`/api/candidate/currentUser`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

import { deletFile, uploadFile } from "@/libs/firebase/cdn/cdn_auth";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createCandidate = async (data) => {
  try {
    const res = await axiosInstance.post("api/candidate", data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useCreateCandidate = () => {
  return useMutation({
    mutationFn: createCandidate,
  });
};

const updateCandidate = async (data) => {
  try {
    const res = await axiosInstance.put("api/candidate", data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useUpdateCandidate = () => {
  return useMutation({
    mutationFn: updateCandidate,
  });
};

const uploadResume = async ({ resume, uid }) => {
  try {
    const res = await uploadFile(resume, `/candidate/${uid}/${uid}_resume`);
    return res;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useUploadResume = () => {
  return useMutation({
    mutationFn: uploadResume,
  });
};

const deleteResume = async (uid) => {
  try {
    const res = await deletFile(`/candidate/${uid}`, `${uid}_resume`);
    return res;
  } catch (err) {
    throw err;
  }
};

// Custom hook accepts category ID
export const useDeletedResume = () => {
  return useMutation({
    mutationFn: deleteResume,
  });
};

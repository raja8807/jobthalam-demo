import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useState } from "react";
import styles from "./no_jobs.module.scss";
import { CheckCircleFill, Whatsapp } from "react-bootstrap-icons";
import { v4 } from "uuid";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { useCreateRequest } from "@/hooks/request_hooks/request_hooks";
import { useUpdateCandidate } from "@/hooks/candidate_hooks/candidate_hooks";

const NoJobs = ({ currentUser, setCurrentUser }) => {
  const [isRequested, setIsRequested] = useState(currentUser?.free_requested);

  const { mutateAsync, isLoading: createRequestIsLoading } = useCreateRequest();
  const { mutateAsync: updateUserAsync, isLoading: updateUserIsLoading } =
    useUpdateCandidate();

  const isLoading = createRequestIsLoading || updateUserIsLoading;

  const sendFreeJobRequests = async () => {
    try {
      const res = await mutateAsync({
        candidate_id: currentUser.id,
        count: 2,
        payment_id: null,
        jobs_sent: 0,
        is_free: true,
      });
      console.log(res);
      if (res.data) {
        const updatedUser = await updateUserAsync({
          ...currentUser,
          free_requested: true,
        });

        setIsRequested(true);
        setCurrentUser(updatedUser.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.NoJobs}>
      {isLoading && <LoadingScreen />}
      {currentUser?.free_requested || isRequested ? (
        <>
          <CheckCircleFill className={styles.check} />
          <strong>Free Jobs Requested</strong>
          <small>
            please wait for our admins to sort personalized jobs for you.
            <br />
            We&apos;ll notify directly to your whatsapp!{" "}
            <Whatsapp color="green" />
          </small>
        </>
      ) : (
        <>
          <strong>Currently There are no job requests.</strong>
          <CustomButton onClick={sendFreeJobRequests}>
            Request 2 Jobs For Free
          </CustomButton>
        </>
      )}
      <CustomButton variant={4}>Request Assured Jobs at Rs.99/-</CustomButton>
    </div>
  );
};

export default NoJobs;

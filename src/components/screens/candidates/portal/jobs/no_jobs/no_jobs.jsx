import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useState } from "react";
import styles from "./no_jobs.module.scss";
import { CheckCircleFill, Whatsapp } from "react-bootstrap-icons";
import { addData } from "@/libs/firebase/firebase";
import { v4 } from "uuid";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { updateUser } from "@/libs/firebase/user/user";

const NoJobs = ({ currentUser, setCurrentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRequested, setIsRequested] = useState(currentUser?.free_requested);

  const sendFreeJobRequests = async () => {
    setIsLoading(true);
    try {
      const id = v4();
      const date = new Date();
      const res = await addData(
        "Request",
        {
          id,
          candidate_id: currentUser.id,
          count: 2,
          payment_id: null,
          created_at: date.toDateString(),
          jobs_sent: 0,
        },
        id
      );
      if (res) {
        const updatedUser = await updateUser({
          ...currentUser,
          free_requested: true,
          request_count: 2,
        });

        setIsRequested(true);
        setCurrentUser(updatedUser);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  //   console.log(currentUser);

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

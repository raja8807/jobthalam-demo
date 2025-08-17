import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useEffect, useState } from "react";
import styles from "./no_jobs.module.scss";
import { CheckCircleFill, Whatsapp } from "react-bootstrap-icons";
import JobRequests from "../../request/request";

const NoJobs = ({ currentUser, setCurrentTabIndex }) => {
  useEffect(() => {
    setCurrentTabIndex(2);
  }, []);

  return (
    <div className={styles.NoJobs}>
      {/* {currentUser?.free_requested || isRequested ? (
        <>
          <CheckCircleFill className={styles.check} />
          <strong>Jobs Requested</strong>
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
          <CustomButton
            onClick={() => {
              setCurrentTabIndex(2);
            }}
          >
            Request Jobs Alerts For Free
          </CustomButton>
        </>
      )}
      <CustomButton
        variant={4}
        onClick={() => {
          setCurrentTabIndex(2);
        }}
      >
        Request Assured Jobs at Rs.99/-
      </CustomButton> */}
    </div>
  );
};

export default NoJobs;

import React from "react";
import styles from "./selected_jobs.module.scss";
import JobCard from "@/components/ui/job/job_card/job_card";
import CustomButton from "@/components/ui/custom_button/custom_button";
const SelectedJobs = ({
  selectedJobs,
  setSelectedJobs,
  reqCount,
  remainingCount,
  sentCont,
}) => {
  return (
    <div className={styles.SelectedJobs}>
      <div className={styles.top}>
        <p>Request count : {reqCount}</p>
        <p>Sent count : {sentCont}</p>
        <p>
          Selected count : {selectedJobs?.length}/{remainingCount}
        </p>
      </div>
      <div className={styles.wrap}>
        {selectedJobs &&
          selectedJobs.map((job) => {
            return (
              <JobCard
                job={job}
                key={job.id}
                actionButton={
                  <CustomButton
                    onClick={() => {
                      setSelectedJobs((prev) =>
                        prev.filter((j) => j.id !== job.id)
                      );
                    }}
                  >
                    Remove
                  </CustomButton>
                }
              />
            );
          })}
      </div>
    </div>
  );
};

export default SelectedJobs;

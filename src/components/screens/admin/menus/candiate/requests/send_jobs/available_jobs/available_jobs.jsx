import CustomTabs from "@/components/ui/tabs/tabs";
import React, { useState } from "react";
import styles from "./available_jobs.module.scss";
import JobCard from "@/components/ui/job/job_card/job_card";
import CustomButton from "@/components/ui/custom_button/custom_button";

const AvailableJobsCol = ({
  availableAdminJobs,
  setSelectedJobs,
  disabled,
}) => {
  const tabs = [
    {
      title: "Admin Jobs",
    },
    {
      title: "Emp Jobs",
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div className={styles.AvailableJobsCol}>
      <CustomTabs
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        stayTop
      />

      <div className={styles.wrap}>
        {availableAdminJobs &&
          availableAdminJobs.map((job) => {
            return (
              <JobCard
                job={job}
                key={job.id}
                actionButton={
                  <CustomButton
                    onClick={() => {
                      setSelectedJobs((prev) => [job, ...prev]);
                    }}
                    disabled={disabled}
                  >
                    Add
                  </CustomButton>
                }
              />
            );
          })}
      </div>
    </div>
  );
};

export default AvailableJobsCol;

import CustomButton from "@/components/ui/custom_button/custom_button";
import React from "react";
import JobForm from "../job_form/job_form";

const NewJob = ({
  setShowNewJob,
  setScreen,
  setAllJobs,
  isUpdate,
  showNewJob,
  skills
}) => {
  return (
    <div>
      <CustomButton
        onClick={() => {
          setShowNewJob(false);
          setScreen("list");
        }}
      >
        Back to all Jobs
      </CustomButton>
      <br />
      <br />
      <JobForm
        setAllJobs={setAllJobs}
        isUpdate={isUpdate}
        showNewJob={showNewJob.job}
        index={showNewJob.index}
        skills={skills}
      />
    </div>
  );
};

export default NewJob;

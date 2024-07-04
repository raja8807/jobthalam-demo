import CustomButton from "@/components/ui/custom_button/custom_button";
import React from "react";
import JobForm from "../job_form/job_form";

const NewJob = ({ setShowNewJob, currentUser, setAllJobs }) => {
  return (
    <div>
      <CustomButton
        onClick={() => {
          setShowNewJob(false);
        }}
      >
        Back to all Jobs
      </CustomButton>
      <br />
      <br />
      <JobForm currentUser={currentUser} setAllJobs={setAllJobs} />
    </div>
  );
};

export default NewJob;
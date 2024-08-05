import CustomButton from "@/components/ui/custom_button/custom_button";
import React from "react";
import JobForm from "../job_form/job_form";

const NewJob = ({
  setShowNewJob,
  currentUser,
  setAllJobs,
  isUpdate,
  showNewJob,
  setAllSkills,
  allSkills,
  setCurrentUser
}) => {
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
      <JobForm
        currentUser={currentUser}
        setAllJobs={setAllJobs}
        isUpdate={isUpdate}
        showNewJob={showNewJob.job}
        index={showNewJob.index}
        setAllSkills={setAllSkills}
        allSkills={allSkills}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
};

export default NewJob;

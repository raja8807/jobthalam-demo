import CustomButton from "@/components/ui/custom_button/custom_button";
import MainFrame from "@/components/ui/main_frame/main_frame";
import React, { useState } from "react";
import NewJob from "./new_job/new_job";
import JobTable from "@/components/jobs/job_table/job_table";

const ManageJobs = ({ allJobs, setAllJobs, currentUser }) => {
  const [showNewJob, setShowNewJob] = useState(false);

  return (
    <MainFrame
      head={`Hello ${currentUser?.first_name} ${currentUser?.last_name}`}
      caption="Here are jobs posted by you"
    >
      {showNewJob ? (
        <NewJob
          setShowNewJob={setShowNewJob}
          currentUser={currentUser}
          setAllJobs={setAllJobs}
        />
      ) : (
        <>
          <CustomButton
            onClick={() => {
              setShowNewJob(true);
            }}
          >
            Post New Job
          </CustomButton>
          <br />
          <br />
          <JobTable jobs={allJobs} title="All Jobs" />
        </>
      )}
    </MainFrame>
  );
};

export default ManageJobs;

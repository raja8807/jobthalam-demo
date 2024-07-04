import MainFrame from "@/components/ui/main_frame/main_frame";
import React from "react";
import NoJobs from "./no_jobs/no_jobs";
import JobTable from "@/components/jobs/job_table/job_table";

const Jobs = ({ currentUser, setCurrentUser, allJobs,isLoading }) => {

  // console.log(allJobs);

  return (
    <MainFrame
      head={`Hello, ${currentUser.first_name} ${currentUser.last_name}`}
      caption="Welcome to Jobthalam, Here are the jobs that suits for you!"
    >
      {allJobs?.[0] ? (
        <JobTable title="Jobs" jobs={allJobs} />
      ) : (
        !isLoading && <NoJobs currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}
    </MainFrame>
  );
};

export default Jobs;

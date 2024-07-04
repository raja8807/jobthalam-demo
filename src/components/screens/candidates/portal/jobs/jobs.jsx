import MainFrame from "@/components/ui/main_frame/main_frame";
import React from "react";
import NoJobs from "./no_jobs/no_jobs";

const Jobs = ({ currentUser, setCurrentUser }) => {
  return (
    <MainFrame
      head={`Hello, ${currentUser.first_name} ${currentUser.last_name}`}
      caption="Welcome to Jobthalam, Here are the jobs that suits for you!"
    >
      <NoJobs currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </MainFrame>
  );
};

export default Jobs;

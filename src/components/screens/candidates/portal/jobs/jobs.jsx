import MainFrame from "@/components/ui/main_frame/main_frame";
import React from "react";
import NoJobs from "./no_jobs/no_jobs";
import JobTable from "@/components/jobs/job_table/job_table";
import { Row } from "react-bootstrap";
import JobCard from "@/components/ui/job/job_card/job_card";
import CustomButton from "@/components/ui/custom_button/custom_button";

const Jobs = ({ currentUser, setCurrentUser, allJobs, isLoading }) => {
  return (
    <MainFrame
      head={`Hello, ${currentUser.first_name} ${currentUser.last_name}`}
      caption="Welcome to Jobthalam, Here are the jobs that suits for you!"
    >
      {allJobs?.[0] ? (
        <Row>
          {allJobs.map((job) => {
            return (
              <JobCard
                key={job.id}
                job={job}
                actionButton={<CustomButton>Apply</CustomButton>}
              />
            );
          })}
        </Row>
      ) : (
        !isLoading && (
          <NoJobs currentUser={currentUser} setCurrentUser={setCurrentUser} />
        )
      )}
    </MainFrame>
  );
};

export default Jobs;

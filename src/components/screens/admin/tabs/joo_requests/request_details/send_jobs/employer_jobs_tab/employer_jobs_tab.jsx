import CustomButton from "@/components/ui/custom_button/custom_button";
import JobCard from "@/components/ui/job/job_card/job_card";
import React from "react";
import { Row } from "react-bootstrap";

const EmployerJobsTab = ({
  availableJobs,
  request,
  featuredJobs,
  newJobs,
  setNewJobs,
  setAvailableJobs
}) => {
  return (
    <Row>
      {availableJobs
        .filter((j) => {
          return !(
            
            featuredJobs.some((nj) => nj?.job?.id == j.id)
          );
        })
        .map((job) => {
          return (
            <JobCard
              key={job.id}
              job={job}
              employer={job?.employer}
              actionButton={
                !(request.count - request.jobs_sent <= newJobs.length) && (
                  <CustomButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setAvailableJobs(prev=> prev.filter(j=> j?.id !== job?.id))
                      setNewJobs((prev) => [job, ...prev]);
                    }}
                  >
                    Add
                  </CustomButton>
                )
              }
            />
          );
        })}
    </Row>
  );
};

export default EmployerJobsTab;

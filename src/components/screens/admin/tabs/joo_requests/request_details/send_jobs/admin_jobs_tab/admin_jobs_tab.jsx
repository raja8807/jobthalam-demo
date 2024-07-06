import CustomButton from "@/components/ui/custom_button/custom_button";
import JobCard from "@/components/ui/job/job_card/job_card";
import React from "react";
import { Row } from "react-bootstrap";

const AdmimJobsTab = ({
  availableJobs,
  request,
  featuredJobs,
  newJobs,
  setNewJobs,
}) => {
  return (
    <Row>
      {availableJobs
        .filter((j) => {
          return !(
            newJobs.some((nj) => nj.id == j.id) ||
            featuredJobs.some((nj) => nj.id == j.id)
          );
        })
        .map((job) => {
          return (
            <JobCard
              key={job.id}
              job={job}
              actionButton={
                !(request.count - request.jobs_sent <= newJobs.length) && (
                  <CustomButton
                    onClick={() => {
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

export default AdmimJobsTab;

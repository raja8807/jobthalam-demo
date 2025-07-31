import JobCard from "@/components/cards/job_card/job_card";
import MainFrame from "@/components/ui/main_frame/main_frame";
import { useFetchApplicationByUid } from "@/hooks/application_hooks/application_hooks";
import { getDataByQuery } from "@/libs/firebase/firebase";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

const ApplicationsTab = ({ appliedJobs }) => {
  return (
    <MainFrame head="Applications">
      <Row>
        {appliedJobs.map((fJob) => {
          return (
            <JobCard
              key={fJob.id}
              featuredJob={fJob}
              jobData={fJob.employerJob}
            />
          );
        })}
      </Row>
    </MainFrame>
  );
};

export default ApplicationsTab;

import CustomButton from "@/components/ui/custom_button/custom_button";
import JobCard from "@/components/ui/job/job_card/job_card";
import { addData, updateData } from "@/libs/firebase/firebase";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { v4 } from "uuid";

const FeaturedJobs = ({ allJobs, currentUser, setAllJobs }) => {
  const [loadingJobId, setLoadingJobId] = useState(null);

  const applyJob = async (job, index) => {
    console.log(job, index);
    setLoadingJobId(job?.id);
    try {
      const application_id = v4();
      const isApplied = await addData(
        "Application",
        {
          ...job,
          candidate_id: currentUser?.id,
          job_id: job?.id,
          status: "Applied",
          id: application_id,
        },
        application_id
      );

      if (isApplied) {
        const updatedFeaturedJob = await updateData(
          "Featured",
          {
            ...job,
            application_id,
            status: "Applied",
          },
          job?.id
        );

        if (updatedFeaturedJob) {
          setAllJobs((prev) => {
            const fJobs = [...prev];
            fJobs[index] = updatedFeaturedJob;
            return fJobs;
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoadingJobId(null);
  };

  return (
    <Row>
      {allJobs.map((job, idx) => {
        return (
          <JobCard
            key={job.id}
            job={job}
            actionButton={
              job.status == "New" && (
                <CustomButton
                  onClick={async (e) => {
                    e.stopPropagation();
                    await applyJob(job, idx);
                  }}
                  isLoading={job.id === loadingJobId}
                  disabled={loadingJobId}
                >
                  Apply
                </CustomButton>
              )
            }
          />
        );
      })}
    </Row>
  );
};

export default FeaturedJobs;

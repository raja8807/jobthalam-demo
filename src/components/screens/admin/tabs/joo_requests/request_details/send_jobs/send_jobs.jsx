import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomTable from "@/components/ui/custom_table/custom_table";
import CustomTableRow from "@/components/ui/custom_table/custom_table_row/custom_table_row";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ArrowLeft, Trash, X } from "react-bootstrap-icons";
import styles from "./send_jobs.module.scss";
import JobTable from "@/components/jobs/job_table/job_table";
import { addData, addMultipleData, updateData } from "@/libs/firebase/firebase";
import JobCard from "@/components/ui/job/job_card/job_card";

const SendJobs = ({
  setShow,
  candidate,
  allJobs,
  request,
  featuredJobs,
  setFeaturedJobs,
}) => {
  const [newJobs, setNewJobs] = useState([]);
  const [availableJobs, setAvailableJobs] = useState(allJobs);
  const [isLoading, setIsLoading] = useState(false);

  const sendJobs = async () => {
    setIsLoading(true);
    try {
      const jobsToSend = newJobs.map((job) => {
        return {
          candidate_id: candidate.id,
          request_id: request.id,
          ...job,
        };
      });
      const res = await addMultipleData("Featured", jobsToSend);
      const allSent = [...res, ...featuredJobs];
      setFeaturedJobs(allSent);

      const updateRes = await updateData(
        "Request",
        { ...request, jobs_sent: allSent.length },
        request.id
      );

      if (updateRes) {
        setShow((prev) => ({ ...prev, jobs_sent: allSent.length }));
        setNewJobs([]);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  console.log(request);

  return (
    <div className={styles.SendJobs}>
      <CustomButton
        onClick={() => {
          setShow(false);
        }}
        variant={2}
      >
        <ArrowLeft /> Back To Details
      </CustomButton>
      <br />
      <br />

      <CustomTable
        head={[
          {
            title: "Title",
          },
          {
            title: "Employer",
          },
          {
            title: "Action",
          },

          //   {
          //     title: "Experience",
          //   },
          //   {
          //     title: "Education",
          //   },
        ]}
        title="Jobs To Send"
        count={`${newJobs.length}/${request.count - request.jobs_sent}`}
      >
        <Row>
          {newJobs.map((job) => {
            return (
              <JobCard
                key={job.id}
                job={job}
                actionButton={
                  <CustomButton
                    onClick={() => {
                      setNewJobs((prev) => {
                        return prev.filter((nj) => nj.id != job.id);
                      });
                    }}
                  >
                    Remove
                  </CustomButton>
                }
              />
            );
          })}
        </Row>
      </CustomTable>
      <br />
      {newJobs.length > 0 && (
        <CustomButton onClick={sendJobs} isLoading={isLoading}>
          Send All
        </CustomButton>
      )}
      <br />
      <br />
      <br />
      <h5>Available Jobs</h5>

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
              // <Col key={job.id} xs={12} md={4} lg={3} className={styles.job}>
              //   <div>{job.title}</div>
              //   <div>Employer &nbsp;: Data Com</div>
              //   <div>Experience : {job.experience}</div>
              //   <br />
              //   <div>
              //     <CustomButton variant={2}>Details</CustomButton>
              //     &nbsp;
              //     <CustomButton
              //       onClick={() => {
              //         setNewJobs((prev) => [job, ...prev]);
              //       }}
              //       disabled={
              //         request.count - request.jobs_sent <= newJobs.length
              //       }
              //     >
              //       Add
              //     </CustomButton>
              //   </div>
              //   {/* <div></div> */}
              // </Col>
            );
          })}
      </Row>

      {/* <JobTable
        jobs={allJobs}
        actionBtnText='Send'
        onActionClick={(job) => {
          setNewJobs((prev) => [job, ...prev]);
        }}
      /> */}
    </div>
  );
};

export default SendJobs;

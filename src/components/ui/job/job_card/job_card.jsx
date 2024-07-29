import React, { useState } from "react";
import { Col, Image } from "react-bootstrap";
import styles from "./job_card.module.scss";
import { Briefcase, GeoAlt } from "react-bootstrap-icons";
import JobDetails from "@/components/jobs/job_details/job_details";

const JobCard = ({ job: jobData, actionButton }) => {
  const [showDetailsFor, setShowDetailsFor] = useState(null);

  const job = jobData.job;
  const employer = jobData.employer;

  return (
    <>
      {showDetailsFor && (
        <JobDetails
          setJob={setShowDetailsFor}
          job={showDetailsFor}
          actionButton={actionButton}
        />
      )}
      <Col xs={12} md={6} lg={4}>
        <div
          className={styles.JobCard}
          onClick={() => {
            setShowDetailsFor(job);
          }}
        >
          <div className={styles.top}>
            <div>
              <p>{job.title}</p>
              <div>
                <div>{job.type}</div>
                <small>&#8377; {job.salary}</small>
              </div>
            </div>

            <div className={styles.status}>
              <div /> {jobData.status}
            </div>
          </div>
          <div className={styles.bottom}>
            <div>
              <div>
                <Image
                  src={job.employer_logo || "/company_logo_placeholder.png"}
                  alt="company_logo"
                  width={50}
                />
              </div>
              <div>
                <p>{job.company_name}</p>
                <small>
                  {employer.company_name}
                  <br />
                  <GeoAlt /> {job.location}
                </small>
              </div>
            </div>
            <div>{actionButton}</div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default JobCard;

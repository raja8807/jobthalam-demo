import React, { useState } from "react";
import { Col, Image } from "react-bootstrap";
import styles from "./job_card.module.scss";
import { Briefcase, GeoAlt } from "react-bootstrap-icons";
import JobDetails from "@/components/jobs/job_details/job_details";

const JobCard = ({ job: jobData, actionButton }) => {
  const [showDetailsFor, setShowDetailsFor] = useState(null);

  const job = jobData.job || jobData.adminjob;
  const employer = jobData.employer;

  return (
    <>
      {showDetailsFor && (
        <JobDetails
          setJob={setShowDetailsFor}
          employer={employer}
          isAdminJob={jobData?.is_admin_job}
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

            <div className={`${styles.status} ${styles[job.status]}`}>
              <div /> {job?.status}
            </div>
          </div>
          <div className={styles.bottom}>
            <div>
              <div>
                <Image
                  src={
                    employer?.employer_logo || "/company_logo_placeholder.png"
                  }
                  alt="company_logo"
                  width={50}
                />
              </div>
              <div>
                <p>{employer?.company_name || job.company_name}</p>
                <small>
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

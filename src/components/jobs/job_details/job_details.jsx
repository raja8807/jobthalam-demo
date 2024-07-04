import React from "react";
import { Image, Modal } from "react-bootstrap";
import styles from "./job_details.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import {
  Briefcase,
  CalendarDate,
  ClockHistory,
  EnvelopeAt,
  GeoAlt,
  Person,
  Phone,
  X,
} from "react-bootstrap-icons";

const JobDetails = ({
  job,
  setJob,
  actionBtnText,

  onActionClick = () => {},
}) => {
  const close = () => {
    setJob(null);
  };
  return (
    <Modal
      show={!!job}
      onHide={close}
      className={styles.JobDetailsModal}
      size="xl"
      centered
    >
      <Modal.Header className={styles.modalHead}>
        <div className={styles.head}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <Image
                src={job?.logoUrl || "/company_logo_placeholder.png"}
                alt="logo"
                height={70}
              />
            </div>
            <div className={styles.name}>
              <h4>{job?.title}</h4>
              <p>at {job?.company?.name}</p>
            </div>
          </div>

          {actionBtnText && (
            <div className={styles.right}>
              {
                <CustomButton
                  onClick={() => {
                    onActionClick(job);
                  }}
                >
                  {actionBtnText}
                </CustomButton>
              }
            </div>
          )}
          <X
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              close();
            }}
          />
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div className={styles.wrap}>
          <div className={styles.top}>
            <div className={styles.box}>
              <div className={styles.box1}>
                {job?.min_salary > 0 && (
                  <div>
                    <h5>Salary (INR)</h5>
                    <p>
                      &#8377; {job?.min_salary}{" "}
                      {job?.max_salary &&
                        job?.max_salary !== job?.min_salary &&
                        `- ${job?.max_salary}`}
                    </p>
                    <small>Per Month</small>
                  </div>
                )}
                <hr />
                <div>
                  <GeoAlt />
                  <p>Job Location</p>
                  <small>{job?.location}</small>
                </div>
              </div>
            </div>
            <div className={styles.box}>
              <h6>Job Overview</h6>
              <div className={styles.box2}>
                <div>
                  <CalendarDate />
                  <p>Job Posted:</p>
                  <span>{new Date(job?.created_at).toLocaleDateString()}</span>
                </div>
                {job?.expiry_date && (
                  <div>
                    <ClockHistory />
                    <p>JOB EXPIRES ON:</p>
                    <span>
                      {new Date(job?.expiry_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {/* <div>
                  <Layers />
                  <p>JOB LEVEL:</p>
                  <span>Entry Level</span>
                </div> */}
                <div>
                  <CalendarDate />
                  <p>EXPERIENCE:</p>
                  <span>
                    {job?.experience}{" "}
                    {job?.experience !== "Fresher" && "Year(s)"}
                  </span>
                </div>
                <div>
                  <Briefcase />
                  <p>EDUCATION:</p>
                  <span>{job?.education}</span>
                </div>
              </div>
            </div>

            {job.employer && (
              <div className={styles.box}>
                <h6>Contact</h6>
                <div className={styles.box3}>
                  <strong>
                    <Person/> &nbsp;{job?.employer.first_name} {job?.employer.last_name}
                  </strong>
                  <div>
                    <EnvelopeAt /> &nbsp;<small>{job?.employer.email}</small>
                  </div>
                  <div>
                    <Phone /> &nbsp;
                    <small>{job.employer.phone_number}</small>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.bottom}>
            <div className={styles.description}>
              <h6>Job Description</h6>
              <p>{job?.description}</p>
              <br />
              <h6>About Company</h6>
              <p>{job?.company?.about}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default JobDetails;

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
  Globe,
  Person,
  Telephone,
  X,
} from "react-bootstrap-icons";
import { formatDate } from "@/utils/helpers/helpers";

const JobDetails = ({
  job,
  setJob,
  actionButton,
  isHidden,
  onDetailButtonClick,
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
      {job && (
        <>
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
                  <p>at {job?.companyName}</p>
                </div>
              </div>

              <div>{actionButton}</div>
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
                    <div>
                      <h5>Salary (INR)</h5>
                      <p>{job?.salary}</p>
                      <small>Per Month</small>
                    </div>
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
                      <span>{formatDate(job.createdAt)}</span>
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

                    {job?.duration ? (
                      <div>
                        <CalendarDate />
                        <p>DURATION:</p>
                        <span>{job?.createdAt} Month(s)</span>
                      </div>
                    ) : (
                      <div>
                        <CalendarDate />
                        <p>EXPERIENCE:</p>
                        <span>{job?.experience}</span>
                      </div>
                    )}
                    <div>
                      <Briefcase />
                      <p>EDUCATION:</p>
                      <span>{job?.education}</span>
                    </div>
                  </div>
                </div>

                <div className={`${styles.box} `}>
                  <h6>Contact</h6>
                  <div
                    className={`${styles.box3} ${
                      isHidden ? styles.hidden : ""
                    }`}
                  >
                    <div>
                      <Person /> &nbsp;
                      <strong>
                        {isHidden ? "Mr. John Doe" : job.companyHrName}
                      </strong>
                    </div>
                    <div>
                      <EnvelopeAt /> &nbsp;
                      <small>
                        {isHidden
                          ? "rishiagarwal@gmail.com"
                          : job?.companyEmail}
                      </small>
                    </div>
                    <div>
                      <Globe /> &nbsp;
                      <small>
                        {isHidden ? "wwww.mycopany.com" : job?.companyWebsite}
                      </small>
                    </div>

                    {isHidden ? (
                      <div>
                        <Telephone /> &nbsp;
                        <small>{"+91 98765 43210"}</small>
                      </div>
                    ) : (
                      job.companyPhone && (
                        <div>
                          <Telephone /> &nbsp;
                          <small>{job?.companyPhone}</small>
                        </div>
                      )
                    )}

                    <br />
                    <hr />
                    {isHidden && (
                      <CustomButton onClick={onDetailButtonClick}>
                        Get Full Details
                      </CustomButton>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.bottom}>
                <div className={styles.description}>
                  <h6>Job Description</h6>
                  <p>{job?.description}</p>
                  <br />
                  <h6>About Company</h6>
                  {isHidden ? (
                    <p className={styles.hidden}>
                      Founded with a vision to simplify technology, we
                      specialize in delivering custom software development,
                      mobile & web applications, cloud solutions, and enterprise
                      grade IT services tailored to our clients unique needs.
                      <br />
                      <br />
                      Our team of passionate developers, designers, and tech
                      strategists works hand-in-hand with businesses across
                      industries from startups to global enterprises to
                      transform ideas into scalable, secure, and user friendly
                      products.
                    </p>
                  ) : (
                    <p>{job?.about_company}</p>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default JobDetails;

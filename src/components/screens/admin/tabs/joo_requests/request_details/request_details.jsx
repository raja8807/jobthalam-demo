import CustomButton from "@/components/ui/custom_button/custom_button";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { getDataByQuery } from "@/libs/firebase/firebase";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import styles from "./request_details.module.scss";
import { Col, Row } from "react-bootstrap";
import SendJobs from "./send_jobs/send_jobs";
import JobTable from "@/components/jobs/job_table/job_table";
import JobCard from "@/components/ui/job/job_card/job_card";

const RequestDetails = ({ request, setShow, allJobs, allAdminJobs }) => {
  const [candidate, setCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSendFor, setShowSendFor] = useState(null);
  const [featuredJobs, setFeaturedJobs] = useState([]);

  const fetchFeaturedJobs = async (id) => {
    try {
      const res = await getDataByQuery("Featured", ["candidate_id", "==", id]);

      setFeaturedJobs(res);
    } catch (err) {
      console.log("fJobs err-->", err);
    }
  };

  const fetchCandidate = async () => {
    setIsLoading(true);
    try {
      const res = await getDataByQuery("Candidate", [
        "id",
        "==",
        request.candidate_id,
      ]);
      setCandidate(res[0]);
      fetchFeaturedJobs(res[0]?.id);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  // console.log(featuredJobs);

  return (
    <>
      {!showSendFor ? (
        <div>
          <CustomButton
            variant={2}
            onClick={async () => {
              await setShow(false);
            }}
          >
            <ArrowLeft />
            &nbsp; Back to requests
          </CustomButton>
          <br />
          <br />
          {isLoading && <LoadingScreen />}
          {candidate && (
            <Row>
              <Col xs={12} lg={6}>
                <div className={styles.candidate_details}>
                  <h5>Candidate Details</h5>
                  <Row>
                    <Col xs={12} lg={6}>
                      <div className={styles.row}>
                        <div>Name</div> : {candidate?.first_name}{" "}
                        {candidate?.last_name}
                      </div>
                      <div className={styles.row}>
                        <div>Education</div> : bachelors degree
                      </div>
                      <div className={styles.row}>
                        <div>Experience</div> : 1
                      </div>
                      <div className={styles.row}>
                        <div>Skill</div> : Sales, Marketing
                      </div>
                      <br />
                    </Col>

                    <Col xs={12} lg={6}>
                      <h5>Contact</h5>
                      <div className={styles.row}>
                        <div>Phone</div> : {candidate?.phone_number}
                      </div>
                      <div className={styles.row}>
                        <div>Whatsapp</div> : {candidate?.phone_number}
                      </div>
                      <div className={styles.row}>
                        <div>Email</div> : {candidate.email}
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <CustomButton variant={2}>Download Resume</CustomButton>
                </div>
              </Col>
              <Col xs={12} lg={6}>
                <div className={styles.candidate_details}>
                  <h5>Request Details</h5>
                  <div className={styles.row}>
                    <div>Count</div> : {request.count}
                  </div>
                  <div className={styles.row}>
                    <div>Jobs Sent</div> : {request.jobs_sent}
                  </div>
                  <div className={styles.row}>
                    <div>Payment Id</div> : {request.payment_id || "Free"}
                  </div>
                  <div className={styles.row}>
                    <div>Requested on</div> : {request.created_at}
                  </div>
                  <br />
                  <br />
                  <CustomButton
                    variant={1}
                    onClick={() => {
                      setShowSendFor(candidate);
                    }}
                  >
                    Send Jobs
                  </CustomButton>
                </div>
              </Col>
            </Row>
          )}

          <Row>
            {
              featuredJobs.map((fj)=>{
                return <JobCard key={fj.id} job={fj} />
              })
            }
          </Row>
        </div>
      ) : (
        <SendJobs
          setShow={setShowSendFor}
          candidate={showSendFor}
          allJobs={allJobs}
          request={request}
          featuredJobs={featuredJobs}
          setFeaturedJobs={setFeaturedJobs}
          allAdminJobs={allAdminJobs}
        />
      )}
    </>
  );
};

export default RequestDetails;

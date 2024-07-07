import MainFrame from "@/components/ui/main_frame/main_frame";
import { getDataByQuery } from "@/libs/firebase/firebase";
import React, { useEffect } from "react";
import styles from "./applications.module.scss";
import ApplicationCard from "@/components/ui/cards/application_card/application_card";
import { Col, Row } from "react-bootstrap";

const Applications = ({
  currentUser,
  setApplications,
  applications,
  allJobs,
}) => {
  const fetchApplications = async () => {
    try {
      const res = await getDataByQuery("Application", [
        "employer_id",
        "==",
        currentUser.id,
      ]);
      setApplications(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!applications) {
      fetchApplications();
    }
  }, []);

  return (
    <MainFrame>
      <div className={styles.Applications}>
        {applications && (
          <Row>
            {applications.map((application) => {
              return (
                <Col key={application.id} xs={12} md={6} lg={4}>
                  <ApplicationCard application={application} />
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </MainFrame>
  );
};

export default Applications;

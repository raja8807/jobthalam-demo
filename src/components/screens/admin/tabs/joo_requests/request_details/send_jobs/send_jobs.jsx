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
import EmployerJobsTab from "./employer_jobs_tab/employer_jobs_tab";
import Tabs from "@/components/ui/tabs/tabs";
import AdminJobsTab from "./admin_jobs_tab/admin_jobs_tab";

const SendJobs = ({
  setShow,
  candidate,
  allJobs,
  request,
  featuredJobs,
  setFeaturedJobs,
  allAdminJobs,
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

  const tabs = [
    {
      id: "emp",
      title: "Employer Jobs",
      component: (
        <EmployerJobsTab
          availableJobs={availableJobs}
          featuredJobs={featuredJobs}
          newJobs={newJobs}
          request={request}
          setNewJobs={setNewJobs}
        />
      ),
    },
    {
      id: "adm",
      title: "Admin Jobs",
      component: (
        <AdminJobsTab
          availableJobs={allAdminJobs}
          featuredJobs={featuredJobs}
          newJobs={newJobs}
          request={request}
          setNewJobs={setNewJobs}
        />
      ),
    },
  ];

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const currentTab = tabs[currentTabIndex];

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
      <Tabs
        currentTab={currentTab}
        tabs={tabs}
        stayTop
        onTabChange={(t, i) => {
          setCurrentTabIndex(i);
        }}
      />
      {currentTab.component}
    </div>
  );
};

export default SendJobs;

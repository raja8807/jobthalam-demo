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
import { v4 } from "uuid";
import { useCreateBulkFeaturedJobs } from "@/hooks/featured_job_hooks/featured_job_hooks";
import { useUpdateRequest } from "@/hooks/request_hooks/request_hooks";

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

  const availableJobs = allJobs;

  const {
    mutateAsync: createBulkFeaturedJobs,
    isLoading: createFeaturedJobsIsLoading,
  } = useCreateBulkFeaturedJobs();

  const { mutateAsync: updateRequestAsync, isLoading: updateRequestIsLoading } =
    useUpdateRequest();

  const isLoading = createFeaturedJobsIsLoading || updateRequestIsLoading;

  const sendJobs = async () => {
    try {
      const jobsToSend = newJobs.map((job) => {
        return {
          is_admin_job: job.is_admin_job || false,
          admin_job_id: job.is_admin_job ? job.id : null,
          job_id: job.is_admin_job ? null : job.id,
          candidate_id: candidate.id,
          request_id: request.id,
          status: "New",
          employer_id: job?.employer_id || null,
        };
      });

      const res = await createBulkFeaturedJobs(jobsToSend);
      const allSent = [...res?.data, ...featuredJobs];

      const updateRes = await updateRequestAsync({
        ...request,
        jobs_sent: allSent.length,
      });

      if (updateRes?.data) {
        setShow((prev) => {
          const x = { ...prev };

          X.jobs_sent = 2;

          return x;
        });
        setNewJobs([]);
      }

      setFeaturedJobs(allSent);
    } catch (error) {
      console.log(error);
    }
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

  // console.log(request);

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
                employer={job?.employer}
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

import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomForm from "@/components/ui/custom_form/custom_form";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { useFetchAllAdminJobs } from "@/hooks/admin_job_hooks/admin_job_hooks";
import {
  useCreateBulkFeaturedJobs,
  useFetchFeaturedJobsById,
} from "@/hooks/featured_job_hooks/featured_job_hooks";
import { useFetchAllJobs } from "@/hooks/job_hooks/job_hooks";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import AvailableJobsCol from "./available_jobs/available_jobs";
import styles from "./send_job.module.scss";
import SelectedJobs from "./selected_jobs/selected_jobs";

const SendJobsScreen = ({ request, setShowSendJobsFor }) => {
  const { mutateAsync, isLoading: fJobsLoading } = useFetchFeaturedJobsById();
  const [candidateFeaturedJobs, setCandidateFeaturedJobs] = useState(null);
  const { data, isLoading: adminJobsIsLoading } = useFetchAllAdminJobs();

  console.log(candidateFeaturedJobs);

  const [availableAdminJobs, setAvailableAdminJobs] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);

  const {
    mutateAsync: createBulkFeaturedJobs,
    isLoading: createFeaturedJobsIsLoading,
  } = useCreateBulkFeaturedJobs();

  const isLoading =
    fJobsLoading || adminJobsIsLoading || createFeaturedJobsIsLoading;

  const fetchData = async () => {
    try {
      const res = await mutateAsync(request?.candidate_id);
      setCandidateFeaturedJobs(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.data && !availableAdminJobs) {
      setAvailableAdminJobs(data?.data);
    }
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  const reqCount = request?.count;
  const sentCont = request?.jobs_sent;

  const remainingCount = reqCount - sentCont;

  const getAvailableAdminJobs = () => {
    if (availableAdminJobs && candidateFeaturedJobs) {
      return availableAdminJobs.filter((aaj) => {
        return (
          !selectedJobs.some((j) => j.id === aaj.id) &&
          !candidateFeaturedJobs.some((j) => j.admin_job_id === aaj.id)
        );
      });
    }
  };

  const handleSend = async () => {
    try {
      const jobsToSend = selectedJobs.map((job) => {
        return {
          is_admin_job: job.is_admin_job || false,
          admin_job_id: job.is_admin_job ? job.id : null,
          job_id: job.is_admin_job ? null : job.id,
          candidate_id: request.candidate_id,
          request_id: request.id,
          status: "New",
          employer_id: job?.employer_id || null,
        };
      });

      const res = await createBulkFeaturedJobs({
        jobsToSend,
        request: {
          ...request,
          jobs_sent: parseInt(request.jobs_sent, 10) + jobsToSend?.length,
        },
      });

      setShowSendJobsFor(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <div className={styles.top}>
        <CustomButton
          onClick={() => {
            setShowSendJobsFor(null);
          }}
        >
          Back
        </CustomButton>
        {selectedJobs?.length ? (
          <CustomButton onClick={handleSend}>Send</CustomButton>
        ) : null}
      </div>
      <br />
      <div className={styles.sendJobs}>
        <Row>
          <Col>
            <div className={styles.col}>
              <AvailableJobsCol
                availableAdminJobs={getAvailableAdminJobs()}
                setSelectedJobs={setSelectedJobs}
                disabled={remainingCount <= selectedJobs?.length}
              />
            </div>
          </Col>
          <Col>
            <div className={styles.col}>
              <SelectedJobs
                selectedJobs={selectedJobs}
                setSelectedJobs={setSelectedJobs}
                reqCount={reqCount}
                remainingCount={remainingCount}
                sentCont={sentCont}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SendJobsScreen;

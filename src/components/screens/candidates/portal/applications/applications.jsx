import JobCard from "@/components/ui/job/job_card/job_card";
import MainFrame from "@/components/ui/main_frame/main_frame";
import { useFetchApplicationByUid } from "@/hooks/application_hooks/application_hooks";
import { getDataByQuery } from "@/libs/firebase/firebase";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

const ApplicationsTab = ({ currentUser, allJobs, setIsLoading }) => {
  const [applications, setAllApplications] = useState([]);

  const { mutateAsync } = useFetchApplicationByUid();

  const getApplications = async () => {
    if (allJobs && allJobs[0]) {
      setIsLoading(true);
      try {
        const allApplications = await mutateAsync(currentUser?.id);

        if (allApplications?.data) {
          const altered =
            allApplications?.data &&
            allApplications?.data.map((app) => {
              const job =
                allJobs?.find((j) => j?.job_id === app?.job_id)?.job || null;
              const adminjob =
                allJobs?.find((j) => j?.admin_job_id === app?.admin_job_id)
                  ?.adminjob || null;

              return {
                ...app,
                job,
                adminjob,
                is_admin_job: !!adminjob,
              };
            });

          setAllApplications(altered || []);
        } else {
          setAllApplications([]);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, [allJobs]);

  console.log(applications);

  return (
    <MainFrame head="Applications">
      <Row>
        {applications.map((a) => {
          return <JobCard key={a.id} job={a} />;
        })}
      </Row>
    </MainFrame>
  );
};

export default ApplicationsTab;

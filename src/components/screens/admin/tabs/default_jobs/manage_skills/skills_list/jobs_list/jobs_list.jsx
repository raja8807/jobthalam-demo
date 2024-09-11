import CustomButton from "@/components/ui/custom_button/custom_button";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { useUpdateBulkAdminJob } from "@/hooks/admin_job_hooks/admin_job_hooks";
import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import UploadJobsPopup from "./upload_job_template/upload_job_template";
import styles from "./jobs_list.module.scss";

const JobsList = ({ allAdminJobs, skill }) => {
  const [adminJobsForSkill, setAdminJobForSkill] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    setAdminJobForSkill(
      allAdminJobs.filter((j) => j.skills === skill.skill) || []
    );
  }, []);

  const { mutateAsync, isLoading } = useUpdateBulkAdminJob();

  const updateAdminJobsForSkill = async () => {
    try {
      await mutateAsync(adminJobsForSkill);
    } catch (err) {
      alert("error");
      console.log(err);
    }
  };

  const MAX_FREE = 2;

  let currentFreeCount = 0;

  adminJobsForSkill.forEach((aj) => {
    if (aj.is_free) {
      currentFreeCount++;
    }
  });

  const [showInactive, setShowInactive] = useState(true);

  return (
    <div>
      <UploadJobsPopup
        show={showUpload}
        setShow={setShowUpload}
        skill={skill.skill}
        setAdminJobForSkill={setAdminJobForSkill}
      />
      {isLoading && <LoadingScreen />}
      <div
        onClick={() => {
          setShowInactive((prev) => !prev);
        }}
        className={styles.toggleActive}
      >
        {showInactive ? "Hide" : "Show"} Inactive Jobs
      </div>
      <hr />
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>Title</th>
            <th>Role</th>
            <th>Active</th>
            <th>Free</th>
          </tr>
        </thead>
        <tbody>
          {adminJobsForSkill.map((aJob, jIndx) => {
            if (!showInactive && aJob.status === "Inactive") {
              return <></>;
            }

            return (
              <tr key={aJob.id}>
                <td>{jIndx + 1}</td>
                <td>{aJob.company_name}</td>
                <td>{aJob.title}</td>
                <td>{aJob.role}</td>
                <td>
                  <Form.Check
                    checked={aJob.status === "Active"}
                    onChange={(e) => {
                      setAdminJobForSkill((prev) => {
                        const aJobs = [...prev];
                        aJobs[jIndx].status = e.target.checked
                          ? "Active"
                          : "Inactive";

                        if (!e.target.checked) {
                          aJobs[jIndx].is_free = false;
                        }

                        return aJobs;
                      });
                    }}
                  />
                </td>
                <td>
                  <Form.Check
                    checked={aJob.is_free}
                    disabled={
                      aJob.status !== "Active" ||
                      (currentFreeCount === MAX_FREE && !aJob.is_free)
                    }
                    onChange={(e) => {
                      setAdminJobForSkill((prev) => {
                        const aJobs = [...prev];
                        aJobs[jIndx].is_free = e.target.checked;
                        return aJobs;
                      });
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CustomButton
        variant={2}
        onClick={() => {
          setShowUpload(true);
        }}
      >
        Upload Excel
      </CustomButton>
      &nbsp; &nbsp;
      <CustomButton onClick={updateAdminJobsForSkill}>
        Save Changes
      </CustomButton>
    </div>
  );
};

export default JobsList;

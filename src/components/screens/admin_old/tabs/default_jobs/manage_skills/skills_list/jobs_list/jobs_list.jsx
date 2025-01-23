import CustomButton from "@/components/ui/custom_button/custom_button";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import {
  useDeleteAdminJob,
  useUpdateBulkAdminJob,
} from "@/hooks/admin_job_hooks/admin_job_hooks";
import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import UploadJobsPopup from "./upload_job_template/upload_job_template";
import styles from "./jobs_list.module.scss";
import { Trash } from "react-bootstrap-icons";
import ConfirmPopup from "@/components/ui/confirm_popup/confirm_popup.jsx";
import { useDeleteSkill } from "@/hooks/skill_hooks/skill_hooks";

const JobsList = ({
  allAdminJobs = [],
  skill,
  allEmployerJobs = [],
  setAllAdminJobs,
  setSkills,
  currentIndustryIndex,
}) => {
  const [adminJobsForSkill, setAdminJobForSkill] = useState([]);
  const [employerJobsForSkill, setEmployerJobsForSkill] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showDeleteSkill, setShowDeleteSkill] = useState(false);

  useEffect(() => {
    setAdminJobForSkill(
      allAdminJobs.filter((j) => j.skills === skill.skill) || []
    );
    setEmployerJobsForSkill(
      allEmployerJobs.filter((j) => j.skills === skill.skill) || []
    );
  }, []);

  const { mutateAsync, isLoading: updateIsLoading } = useUpdateBulkAdminJob();
  const { mutateAsync: deleteAdminJobAsync, isLoading: deleteIsLoading } =
    useDeleteAdminJob();

  const { mutateAsync: deleteSkillAsync, isLoading: deleteSkillIsLoading } =
    useDeleteSkill();

  const isLoading = updateIsLoading || deleteIsLoading || deleteSkillIsLoading;

  const updateAdminJobsForSkill = async () => {
    try {
      await mutateAsync({
        adminJobs: adminJobsForSkill,
        employerJobs: employerJobsForSkill,
      });
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
  employerJobsForSkill.forEach((aj) => {
    if (aj.is_free) {
      currentFreeCount++;
    }
  });

  const [showInactive, setShowInactive] = useState(true);
  const [showDeleteAdminJobFor, setShowDeleteAdminJobFor] = useState(null);

  const deleteJob = async () => {
    try {
      const delRes = await deleteAdminJobAsync(showDeleteAdminJobFor?.id);
      if (delRes.status === 204) {
        setAdminJobForSkill((prev) =>
          prev.filter((aj) => aj?.id !== showDeleteAdminJobFor?.id)
        );
        setAllAdminJobs((prev) =>
          prev.filter((aj) => aj?.id !== showDeleteAdminJobFor?.id)
        );
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  const deleteSkill = async () => {
    try {
      const delRes = await deleteSkillAsync(skill?.id);

      if (delRes.status === 204) {
        setSkills((prev) => {
          const industrySkills = [...prev];

          industrySkills[currentIndustryIndex].skills = industrySkills[
            currentIndustryIndex
          ].skills.filter((s) => s.id !== skill.id);

          return industrySkills;
        });
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  return (
    <div className={styles.JobsList}>
      <UploadJobsPopup
        show={showUpload}
        setShow={setShowUpload}
        skill={skill.skill}
        setAdminJobForSkill={setAdminJobForSkill}
      />
      <ConfirmPopup
        show={showDeleteAdminJobFor}
        setShow={setShowDeleteAdminJobFor}
        onConfirm={deleteJob}
      />
      <ConfirmPopup
        show={showDeleteSkill}
        setShow={setShowDeleteSkill}
        onConfirm={deleteSkill}
        isLoading={deleteSkillIsLoading}
      />
      {isLoading && <LoadingScreen />}
      <div className={styles.toggleActive}>
        <p
          onClick={() => {
            setShowInactive((prev) => !prev);
          }}
        >
          {showInactive ? "Hide" : "Show"} Inactive Jobs
        </p>
        <CustomButton
          disabled={
            adminJobsForSkill.length + employerJobsForSkill.length !== 0
          }
          onClick={() => {
            setShowDeleteSkill(true);
          }}
        >
          Delete Skill
        </CustomButton>
      </div>
      <hr />
      <h5 className={styles.title}>Posted By Admins</h5>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>Title</th>
            <th>Role</th>
            <th>Active</th>
            <th>Free</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {adminJobsForSkill.map((aJob, jIndx) => {
            if (!showInactive && aJob.status === "Inactive") {
              return <></>;
            }

            return (
              <tr key={aJob.id} className={styles.jobRow}>
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

                <td className={styles.action}>
                  <Trash
                    onClick={() => {
                      setShowDeleteAdminJobFor(aJob);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {adminJobsForSkill?.length === 0 && (
        <p className={styles.title}>No Jobs Found</p>
      )}
      {employerJobsForSkill?.[0] && (
        <>
          <hr />
          <h5 className={styles.title}>Posted By Employers</h5>
          <br />
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Company</th>
                <th>Title</th>
                <th>Role</th>
                <th>Active</th>
                <th>Free</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employerJobsForSkill.map((empJob, jIndx) => {
                if (!showInactive && empJob.status === "Inactive") {
                  return <></>;
                }

                return (
                  <tr key={empJob.id}>
                    <td>{jIndx + 1}</td>
                    <td>{empJob.employer?.company_name}</td>
                    <td>{empJob.title}</td>
                    <td>{empJob.role}</td>
                    <td>
                      <Form.Check
                        checked={empJob.status === "Active"}
                        onChange={(e) => {
                          setEmployerJobsForSkill((prev) => {
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
                        checked={empJob.is_free}
                        disabled={
                          empJob.status !== "Active" ||
                          (currentFreeCount === MAX_FREE && !empJob.is_free)
                        }
                        onChange={(e) => {
                          setEmployerJobsForSkill((prev) => {
                            const aJobs = [...prev];
                            aJobs[jIndx].is_free = e.target.checked;
                            return aJobs;
                          });
                        }}
                      />
                    </td>
                    <td />
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
      <br />
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

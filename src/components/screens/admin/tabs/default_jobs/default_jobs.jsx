import React, { useEffect, useState } from "react";
import styles from "./default_jobs.module.scss";
import MainFrame from "@/components/ui/main_frame/main_frame";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
// import  from "@/constants/skills";
import { Col, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import AddDefaultJobs from "./add_jobs/add_jobs";
import {
  useDeleteDefaultJob,
  useFetchAllDefaultJobs,
} from "@/hooks/default_job_hooks/default_job_hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import JobCard from "@/components/ui/job/job_card/job_card";
import ManageSkills from "./manage_skills/manage_skills";

const DefaultJobs = ({ jobs, adminJobs, skills, setSkills }) => {
  const [currentIndustry, setCurrentIndustry] = useState(null);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [defaultJobs, setDefaultJobs] = useState([]);
  const [showAddFor, setShowAddFor] = useState(null);

  const SKILL_CATEGORIES = skills || [];

  const getSkills = (industryId) => {
    if (industryId) {
      const x = SKILL_CATEGORIES.find((sc) => sc.name === industryId?.name);
      return x?.skills || [];
    }
  };

  const { mutateAsync, isLoading: fetchIsLoading } = useFetchAllDefaultJobs();
  const { mutateAsync: deleteDefaultJobAsync, isLoading: deleteIsLoading } =
    useDeleteDefaultJob();

  const isLoading = fetchIsLoading || deleteIsLoading;

  const fetchDefaultJobs = async () => {
    try {
      const res = await mutateAsync();
      setDefaultJobs(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDefaultJobs();
  }, []);

  const deleteDefaultJob = async (defaultJob) => {
    try {
      const res = await deleteDefaultJobAsync(defaultJob?.id);
      console.log(res);
      if (res?.status === 204) {
        setDefaultJobs((prev) => prev.filter((pj) => pj.id != defaultJob.id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const defaultJobsForCurrentSkill = defaultJobs.filter(
    (df) => df.skill === currentSkill?.skill
  );
  const defaultFreeJobsForCurrentSkill = defaultJobsForCurrentSkill.filter(
    (df) => df.is_free
  );

  const defaultPaidJobsForCurrentSkill = defaultJobsForCurrentSkill.filter(
    (df) => !df.is_free
  );

  const [showManage, setShowManage] = useState(false);

  return (
    <MainFrame>
      {isLoading && <LoadingScreen />}
      <CustomButton
        onClick={() => {
          setShowManage((prev) => !prev);
        }}
      >
        {showManage ? "Back" : "Manage Skills"}
      </CustomButton>
      {showManage ? (
        <ManageSkills
          SkillCategories={SKILL_CATEGORIES}
          setSkills={setSkills}
        />
      ) : (
        <div>
          <Row>
            <Col xs={12} md={4}>
              <CustomSelect
                options={SKILL_CATEGORIES.map((s) => s.name)}
                label="Select Industry"
                value={currentIndustry?.name}
                onChange={(e, v) => {
                  setCurrentIndustry(() => {
                    return SKILL_CATEGORIES.find((ind) => ind.name === v);
                  });
                  setCurrentSkill(null);
                }}
              />
            </Col>
            <Col xs={12} md={4}>
              {currentIndustry && (
                <CustomSelect
                  options={getSkills(currentIndustry).map((i) => i.skill)}
                  label="Select Skill"
                  onChange={(e, v) => {
                    setShowAddFor(null);
                    setCurrentSkill(() => {
                      if (currentIndustry?.skills) {
                        return currentIndustry?.skills.find(
                          (s) => s.skill === v
                        );
                      }
                      return null;
                    });
                  }}
                  value={currentSkill?.skill}
                />
              )}
            </Col>
          </Row>
          <br />
          {currentIndustry && currentSkill && (
            <>
              {showAddFor ? (
                <CustomButton
                  onClick={() => {
                    setShowAddFor(null);
                  }}
                  variant={2}
                >
                  Back
                </CustomButton>
              ) : (
                <>
                  <CustomButton
                    onClick={() => {
                      setShowAddFor({
                        industry: currentIndustry?.name,
                        skill: currentSkill?.skill,
                        isFree: true,
                      });
                    }}
                    disabled={defaultFreeJobsForCurrentSkill.length === 2}
                  >
                    Add Free Jobs
                  </CustomButton>
                  &nbsp;
                  <CustomButton
                    onClick={() => {
                      setShowAddFor({
                        industry: currentIndustry?.name,
                        skill: currentSkill?.skill,
                        isFree: false,
                      });
                    }}
                  >
                    Add Paid Jobs
                  </CustomButton>
                </>
              )}
            </>
          )}
          {showAddFor ? (
            <AddDefaultJobs
              showAddFor={showAddFor}
              defaultJobs={defaultJobs}
              jobs={jobs}
              adminJobs={adminJobs}
              setDefaultJobs={setDefaultJobs}
              noAdd={
                showAddFor?.isFree &&
                defaultFreeJobsForCurrentSkill.length === 2
              }
            />
          ) : (
            <>
              {currentSkill && (
                <div>
                  <br />
                  <h5>Default Jobs for {currentSkill?.skill}</h5>
                  <h6>Free ({defaultFreeJobsForCurrentSkill?.length}/2)</h6>
                  <Row>
                    {defaultFreeJobsForCurrentSkill.map((j) => (
                      <JobCard
                        key={j.id}
                        job={j?.job || j?.adminjob}
                        employer={j?.employer}
                        actionButton={
                          <CustomButton
                            onClick={async (e) => {
                              e.stopPropagation();
                              await deleteDefaultJob(j);
                            }}
                          >
                            Remove
                          </CustomButton>
                        }
                      />
                    ))}
                  </Row>
                  <hr />
                  <h6>Paid</h6>
                  <Row>
                    {defaultPaidJobsForCurrentSkill.map((j) => (
                      <JobCard
                        key={j.id}
                        job={j?.job || j?.adminjob}
                        employer={j?.employer}
                        actionButton={
                          <CustomButton
                            onClick={async (e) => {
                              e.stopPropagation();
                              await deleteDefaultJob(j);
                            }}
                          >
                            Remove
                          </CustomButton>
                        }
                      />
                    ))}
                  </Row>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </MainFrame>
  );
};

export default DefaultJobs;

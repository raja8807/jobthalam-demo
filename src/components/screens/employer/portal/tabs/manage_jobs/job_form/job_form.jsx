import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./job_form.module.scss";
import CustomTextArea from "@/components/ui/custom_textarea/custom_textarea";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
import { X } from "react-bootstrap-icons";
import { useCreateJob, useUpdateJob } from "@/hooks/job_hooks/job_hooks";
import CustomSkillSelector from "@/components/ui/select/custom_skills_selector/custom_skills_selector";
import { useFetchSkills } from "@/hooks/skill_hooks/skill_hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import NewSkillPopupButton from "./new_skill_popup/new_skill_popup";
import { EDUCATIONS, EXPERIENCES, JOB_TYPES, LOCATIONS } from "@/constants/job";

const JobForm = ({
  isUpdate,
  currentUser,
  setAllJobs,
  showNewJob,
  index,
  setAllSkills,
  allSkills,
  setCurrentUser,
  setShowNewJob,
}) => {
  const initialValues = isUpdate
    ? { ...showNewJob }
    : {
        title: "",
        role: "",
        experience: "",
        education: "",
        description: "",
        location: "",
        type: "Full time",
        salary: "",
        employer_id: currentUser?.id,
        status: "Active",
        skills: "",
      };

  const [values, setValues] = useState(initialValues);
  const [skills, setSkills] = useState([]);

  const { mutateAsync: createJob, isLoading: createJobIsLoading } =
    useCreateJob();
  const { mutateAsync: updateJob, isLoading: updateJobIsLoading } =
    useUpdateJob();

  const { mutateAsync, isLoading: skillsIsLoading } = useFetchSkills();

  const fetchSkills = async () => {
    try {
      const skillsData = await mutateAsync();

      const industry = [];

      if (skillsData?.data) {
        skillsData?.data.forEach((skill) => {
          if (skill?.isIndustry) {
            const ind = {
              id: skill?.id,
              name: skill?.industry,
              skills: skillsData?.data
                ?.filter((s) => !s?.isIndustry && s.industry === skill.industry)
                .map((x) => x.skill),
            };
            industry.push(ind);
          }
        });
      }
      setSkills(industry || []);
      setAllSkills(industry || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!allSkills[0]) {
      fetchSkills();
    } else {
      setSkills(allSkills);
    }
  }, []);

  const isLoading = createJobIsLoading || updateJobIsLoading || skillsIsLoading;

  const postJob = async () => {
    try {
      if (isUpdate) {
        const res = await updateJob({ ...showNewJob, ...values });
        setAllJobs((prev) => {
          const jobs = [...prev];
          jobs[index] = { ...res?.data, employer: res.data };
          return jobs;
        });
      } else {
        const res = await createJob({
          job: { ...values },
          employer: currentUser,
        });

        setValues(initialValues);
        setAllJobs((prev) => [
          { ...res?.data, employer: currentUser },
          ...prev,
        ]);
        setCurrentUser((prev) => ({
          ...prev,
          jobs_pending: prev.jobs_pending - 1,
        }));
        setShowNewJob(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.JobForm}>
      {isLoading && <LoadingScreen />}
      <div className={styles.head}>
        <h5> {!isUpdate ? "Create New Job" : "Update Job"}</h5>
        <CustomButton
          variant={2}
          onClick={() => {
            setValues(initialValues);
          }}
        >
          Clear <X />
        </CustomButton>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await postJob();
        }}
      >
        <Row>
          <Col>
            <div className={styles.control}>
              <CustomInput
                value={values.title}
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, title: v }));
                }}
                label="Title"
                required
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomInput
                value={values.role}
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, role: v }));
                }}
                label="Role"
              />
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomSelect
                value={values.experience}
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, experience: v }));
                }}
                required
                label="Required Experience"
                placeholder="Select Experience"
                options={EXPERIENCES}
              />
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomSelect
                value={values.education}
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, education: v }));
                }}
                required
                label="Minimum Education"
                placeholder="Select Education"
                options={EDUCATIONS}
              />
            </div>
          </Col>
        </Row>

        {/* ----------------------------------- */}

        <Row>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomInput
                value={values.salary}
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, salary: v }));
                }}
                label="Salary"
                type="number"
                min={0}
                minLength={0}
                required
              />
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomSelect
                value={values.location}
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, location: v }));
                }}
                label="Job Location"
                options={LOCATIONS}
                placeholder="Select Location"
                required
              />
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomSelect
                value={values.type}
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, type: v }));
                }}
                label="Type"
                required
                options={JOB_TYPES}
              />
            </div>
          </Col>
          <Col xs={12}>
            <div className={styles.control}>
              <CustomSkillSelector
                onSelect={(a) => {
                  setValues((prev) => ({ ...prev, skills: a.join() }));
                }}
                skills={skills}
                initialSkills={values.skills ? values.skills.split(",") : []}
                max={1}
                disabled={isUpdate}
              />
              {!isUpdate && (
                <NewSkillPopupButton
                  setAllSkills={setAllSkills}
                  allSkills={allSkills}
                  currentUser={currentUser}
                />
              )}
            </div>
          </Col>
        </Row>

        {/* ----------------------------------- */}
        <Row>
          <Col>
            <CustomTextArea
              label="Description"
              rows={5}
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, description: v }));
              }}
              required
              value={values.description}
            />
          </Col>
        </Row>
        <br />
        <CustomButton
          value={values.description}
          isLoading={isLoading}
          disabled={!values?.skills}
        >
          {isUpdate ? "Update" : "Post"} Job
        </CustomButton>
      </form>
    </div>
  );
};

export default JobForm;

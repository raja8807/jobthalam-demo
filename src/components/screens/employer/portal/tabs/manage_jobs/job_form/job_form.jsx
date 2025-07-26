import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./job_form.module.scss";
import CustomTextArea from "@/components/ui/custom_textarea/custom_textarea";
import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
import { X } from "react-bootstrap-icons";
import { useUpdateJob } from "@/hooks/job_hooks/job_hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { EDUCATIONS, EXPERIENCES, JOB_TYPES, LOCATIONS } from "@/constants/job";
import SkillSelector from "@/components/skill_selector/skill_selector";
import {
  useCreateEmployerJob,
  useUpadteEmployerJob,
} from "@/api-hooks/employer_job_hooks/employer_job.hooks";
import NewSkillPopupButton from "./new_skill_popup/new_skill_popup";

const JobForm = ({
  isUpdate,
  currentUser,
  showNewJob,
  setShowNewJob,
  index,
}) => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const initialValues = isUpdate
    ? { ...showNewJob }
    : {
        title: "Test",
        role: "Test role",
        experience: "Fresher",
        education: "GED",
        description: "test desc",
        location: "Chennai",
        type: "Full time",
        salary: "10000",
        employer_id: currentUser?.id,
        status: "Active",
      };

  const [values, setValues] = useState(initialValues);

  const { mutateAsync: createEmployerJob, isPending: createJobIsLoading } =
    useCreateEmployerJob(currentUser?.id);

  const { mutateAsync: updateEmployerJob, isPending: updateJobIsLoading } =
    useUpadteEmployerJob(currentUser?.id, index);

  const isLoading = createJobIsLoading || updateJobIsLoading;

  const postJob = async () => {
    try {
      if (isUpdate) {
        await updateEmployerJob({ ...showNewJob, ...values });
      } else {
        await createEmployerJob({
          ...values,
          skill_ids: selectedSkills.map((s) => s.id),
        });
      }
      setValues(initialValues);
      setShowNewJob(false);
      alert("sucess");
    } catch (error) {
      alert("error");
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
        </Row>

        {/* ----------------------------------- */}
        <Row>
          <Col xs={12}>
            <div className={styles.control}>
              <SkillSelector
                max={5}
                onChanage={setSelectedSkills}
                initialSkills={showNewJob?.skills}
                disabled={isUpdate}
              />
              {/* {!isUpdate && <NewSkillPopupButton currentUser={currentUser} />} */}
            </div>
          </Col>

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
          // disabled={!}
        >
          {isUpdate ? "Update" : "Post"} Job
        </CustomButton>
      </form>
    </div>
  );
};

export default JobForm;

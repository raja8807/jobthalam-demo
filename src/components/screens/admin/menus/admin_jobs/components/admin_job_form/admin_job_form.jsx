import React, { useEffect, useState } from "react";
import CustomForm from "../../../../../../ui/custom_form/custom_form";
import { Col, Row } from "react-bootstrap";
import CustomInput from "../../../../../../ui/cuatom_input/cuatom_input";
import CustomSelect from "../../../../../../ui/select/custom_select/custom_select";
import CustomSkillSelector from "../../../../../../ui/select/custom_skills_selector/custom_skills_selector";
import CustomTextArea from "../../../../../../ui/custom_textarea/custom_textarea";
import { useFetchAllSkills } from "../../../../../../../hooks/api_hooks/skill_hooks/skill_hooks";
import CustomButton from "../../../../../../ui/custom_button/custom_button";
import { useCreateAdminJob } from "../../../../../../../hooks/admin_job_hooks/admin_job_hooks";
import { EDUCATIONS, EXPERIENCES, JOB_TYPES } from "@/constants/job";

const AdminJobsForm = ({ jobToUpdate, handleUpdateJob }) => {
  const isUpdate = !!jobToUpdate;
  const styles = {};
  const { data: skillsData } = useFetchAllSkills();
  const [skills, setSkills] = useState([]);

  const { mutateAsync: createAdminJobAsync, isLoading: createIsLoading } =
    useCreateAdminJob();

  useEffect(() => {
    const industry = [];

    if (skillsData?.data) {
      skillsData?.data.forEach((skill) => {
        if (skill?.isIndustry) {
          const ind = {
            id: skill?.id,
            name: skill?.industry,
            skills: skillsData?.data?.filter(
              (s) =>
                !s?.isIndustry && s.industry === skill.industry && s.is_active
            ),
          };
          industry.push(ind);
        }
      });
    }

    setSkills(industry);
  }, [skillsData]);

  const initialValues = jobToUpdate || {
    // Company ------
    company_name: "",
    company_email: "",
    company_phone_number: "",
    company_spoc_name: "",
    company_website: "",

    // Job ------
    title: "",
    role: "",
    experience: "",
    education: "",
    description: "",
    location: "",
    type: "Full time",
    salary: "",
    status: "Active",
    skills: "",
    is_admin_job: true,
    is_free: false,
  };

  const [values, setValues] = useState(initialValues);

  const handleSave = async () => {
    if (isUpdate) {
      await handleUpdateJob({ ...values, is_featured: false });
    } else {
      await createAdminJobAsync({
        ...values,
      });
      setValues(initialValues);
    }
  };

  return (
    <CustomForm onSubmit={handleSave}>
      {/* Company details -----------------------------------------------------------------------------*/}

      <div>
        <h5>Company Details</h5>
        <Row>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomInput
                label="Company Name"
                required
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, company_name: v }));
                }}
                value={values.company_name}
              />
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomInput
                label="HR Name"
                // required
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, company_spoc_name: v }));
                }}
                value={values.company_spoc_name}
              />
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomInput
                label="Email"
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, company_email: v }));
                }}
                value={values.company_email}
              />
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomInput
                label="Phone Number"
                required
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, company_phone_number: v }));
                }}
                value={values.company_phone_number}
              />
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomInput
                label="Website"
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, company_website: v }));
                }}
                value={values.company_website}
              />
            </div>
          </Col>
        </Row>
      </div>
      <hr />

      {/* job details -------------------------------------------------------------------------------- */}

      <div>
        <h5>Job Details</h5>
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
                options={["Chennai", "Coimbatore"]}
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
          {values.type === "Internship" && (
            <Row>
              <Col xs={12} md={6} lg={4}>
                <div className={styles.control}>
                  <CustomInput
                    value={values.duration}
                    onChange={(e, v) => {
                      setValues((prev) => ({ ...prev, duration: v }));
                    }}
                    label="Duration (Months)"
                    required
                    type="number"
                  />
                </div>
              </Col>
            </Row>
          )}

          <Col>
            <div className={styles.control}>
              <br />
              <CustomSkillSelector
                onSelect={(a) => {
                  setValues((prev) => ({ ...prev, skills: a.join() }));
                }}
                initialSkills={values.skills ? values.skills.split(",") : []}
                skills={skills || []}
                max={1}
              />
              <br />
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
      </div>
      <br />
      <label>
        is Free Job? &nbsp;
        <input
          type="checkBox"
          value={values.is_free}
          checked={values?.is_free}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, is_free: e.target.checked }));
          }}
        />
      </label>
      <br />
      <br />
      <CustomButton isLoading={createIsLoading}>Save</CustomButton>
    </CustomForm>
  );
};

export default AdminJobsForm;

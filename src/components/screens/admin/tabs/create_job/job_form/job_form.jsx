import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./job_form.module.scss";
import CustomTextArea from "@/components/ui/custom_textarea/custom_textarea";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { addData, updateData } from "@/libs/firebase/firebase";
import { v4 } from "uuid";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
import { X } from "react-bootstrap-icons";
import ControlLabel from "@/components/ui/contol_label/control_label";

const JobForm = ({ isUpdate, setAllJobs, showNewJob, index }) => {
  const initialValues = isUpdate
    ? { ...showNewJob }
    : {
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
      };

  const [values, setValues] = useState(initialValues);

  const [isLoading, setIsLoading] = useState(false);

  const postJob = async () => {
    setIsLoading(true);
    try {
      if (isUpdate) {
        const res = await updateData(
          "Admin_job",
          { ...showNewJob, ...values },
          showNewJob?.id
        );

        setAllJobs((prev) => {
          const jobs = [...prev];
          jobs[index] = res;
          return jobs;
        });
      } else {
        const id = v4();
        const date = new Date();

        const res = await addData(
          "Admin_job",
          {
            id,
            ...values,
            created_at: date.toDateString(),
            status: "Active",
            isAdminJob: true,
          },
          id
        );

        setValues(initialValues);
        setAllJobs((prev) => [res, ...prev]);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.JobForm}>
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
        <hr />
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
                  options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
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
                  options={[
                    "No Education Required",
                    "Bachelor Degree",
                    "Master Degree",
                  ]}
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
                  options={["Full time", "Part time"]}
                />
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
        <CustomButton value={values.description} isLoading={isLoading}>
          {isUpdate ? "Update" : "Post"} Job
        </CustomButton>
      </form>
    </div>
  );
};

export default JobForm;

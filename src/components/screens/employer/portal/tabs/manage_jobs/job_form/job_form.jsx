import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./job_form.module.scss";
import CustomTextArea from "@/components/ui/custom_textarea/custom_textarea";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { addData } from "@/libs/firebase/firebase";
import { v4 } from "uuid";

const JobForm = ({ isUpdate, currentUser, setAllJobs }) => {
  const [values, setValues] = useState({
    title: "",
    role: "",
    experience: "",
    education: "",
    description: "",
    location: "",
    type: "",
    salary: "",
    employer_id: currentUser?.id,
  });

  const postJob = async () => {
    try {
      const id = v4();
      const date = new Date();

      const res = await addData(
        "Job",
        {
          id,
          ...values,
          created_at: date.toDateString(),
        },
        id
      );

      setValues({
        title: "",
        role: "",
        experience: "",
        education: "",
        description: "",
        location: "",
        type: "",
        salary: "",
        employer_id: currentUser?.id,
      });
      setAllJobs((prev) => [res, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.JobForm}>
      <h5> {!isUpdate ? "Create New Job" : "Update Job"}</h5>
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
              <CustomInput
                value={values.experience}
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, experience: v }));
                }}
                label="Experience"
              />
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomInput
                value={values.education}
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, education: v }));
                }}
                label="Education"
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
              />
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomInput
                value={values.location}
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, location: v }));
                }}
                label="Location"
              />
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.control}>
              <CustomInput
                value={values.type}
                onChange={(e, v) => {
                  setValues((prev) => ({ ...prev, type: v }));
                }}
                label="Type"
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
            />
          </Col>
        </Row>
        <br />
        <CustomButton value={values.description}>Post Job</CustomButton>
      </form>
    </div>
  );
};

export default JobForm;

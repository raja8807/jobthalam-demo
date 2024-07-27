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
import { useCreateJob, useUpdateJob } from "@/hooks/job_hooks/job_hooks";

const JobForm = ({ isUpdate, currentUser, setAllJobs, showNewJob, index }) => {
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
      };

  const [values, setValues] = useState(initialValues);

  const { mutateAsync: createJob, isLoading: createJobIsLoading } =
    useCreateJob();
  const { mutateAsync: updateJob, isLoading: updateJobIsLoading } =
    useUpdateJob();

  const isLoading = createJobIsLoading || updateJobIsLoading;

  const postJob = async () => {
    try {
      if (isUpdate) {
        const res = await updateJob({ ...showNewJob, ...values });
        setAllJobs((prev) => {
          const jobs = [...prev];
          jobs[index] = res.data;
          return jobs;
        });
      } else {
        const id = v4();
        const date = new Date();

        const res = await createJob({ ...values });

        setValues(initialValues);
        setAllJobs((prev) => [res, ...prev]);
      }
    } catch (error) {
      console.log(error);
    }
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
        <br />
        <CustomButton value={values.description} isLoading={isLoading}>
          {isUpdate ? "Update" : "Post"} Job
        </CustomButton>
      </form>
    </div>
  );
};

export default JobForm;

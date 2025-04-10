import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./internship_form.module.scss";
import { X } from "react-bootstrap-icons";
import { useCreateSubmission } from "@/hooks/form_hooks/form_hooks";
import CustomButton from "../custom_button/custom_button";
import CustomInput from "../cuatom_input/cuatom_input";
import CustomSelect from "../select/custom_select/custom_select";

const InternShipFormModal = ({ show, setShow, jobId,setShowLogin }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    year: "",
    department: "",
    duration: "",
  });

  const { mutateAsync, isLoading: submitIsLoading } = useCreateSubmission();

  const handleSubmit = async () => {
    try {
      await mutateAsync({
        ...values,
        admin_job_id: jobId,
      });
      setValues({
        name: "",
        phone: "",
        email: "",
        year: "",
        department: "",
        duration: "",
      });
      alert("Thank you for showing interest. We will get back to you soon");
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      centered
      className={styles.enqModal}
    >
      <Modal.Header>
        <div className={styles.head}>
          <b>Get Started</b>
          <X
            onClick={(e) => {
              setShow(false);
            }}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <form
          className={styles.form}
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          <div className={styles.controls}>
            <CustomInput
              placeHolder="Name"
              required
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, name: v }));
              }}
              value={values.name}
            />
            <CustomInput
              placeHolder="Phone"
              required
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, phone: v }));
              }}
              value={values.phone}
              // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              // type="tel"
              pre={"+91"}
            />
            <CustomInput
              placeHolder="Email"
              required
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, email: v }));
              }}
              value={values.email}
              type="email"
            />
            <CustomSelect
              placeholder="Department"
              options={["Engineering", "Arts & Science"]}
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, department: v }));
              }}
              value={values.department}
            />
            <CustomInput
              placeHolder="Passed out year"
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, year: v }));
              }}
              value={values.year}
              type="number"
              min={1970}
            />

            <CustomInput
              placeHolder="Duration"
              type="number"
              onChange={(e, v) => {
                setValues((prev) => ({ ...prev, duration: v }));
              }}
              value={values.duration}
              min={1}
            />
            <div className={styles.agree}>
              <input
                type="checkbox"
                onChange={(e) => {
                  setIsAgreed(e.target.checked);
                }}
              />
              <p>
                Agree to our <span>Terms and Conditions.</span>
              </p>
            </div>
            <br />
            <CustomButton isLoading={submitIsLoading} disabled={!isAgreed}>
              Submit
            </CustomButton>
          </div>

          <div className={styles.signup}>
            <div className={styles.divider}>
              <hr />
              <small>OR</small>
              <hr />
            </div>
            <CustomButton
              variant={2}
              onClick={() => {
                setShow(false);
                setShowLogin(true);
              }}
            >
              Register As Candidate
            </CustomButton>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default InternShipFormModal;

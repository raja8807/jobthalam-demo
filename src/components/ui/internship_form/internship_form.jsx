import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./internship_form.module.scss";
import { X } from "react-bootstrap-icons";

import CustomButton from "../custom_button/custom_button";
import CustomInput from "../cuatom_input/cuatom_input";
import CustomSelect from "../select/custom_select/custom_select";
import { useCreateIntershipEnquirySubmission } from "@/api_hooks/home/home.hooks";
import PersonalInfoForm from "./internship_form_modal/internship_form_modal";

const InternShipFormModal = ({ show, setShow, jobId, setShowLogin }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      centered
      className={styles.enqModal}
      size="lg"
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
        <PersonalInfoForm setShow={setShow} jobId={jobId} />
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
      </Modal.Body>
    </Modal>
  );
};

export default InternShipFormModal;

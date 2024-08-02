import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./otp_verify.module.scss";
import { X } from "react-bootstrap-icons";

import { auth } from "@/libs/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

const OtpVerify = ({ showLogin, setShowLogin }) => {
  const [otpSent, setOtpSent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState("9876543210");
  const [otp, setOtp] = useState("123456");

  const router = useRouter();

  const login = async () => {
    setIsLoading(true);
    try {
      const session = await signInWithEmailAndPassword(
        auth,
        "yora8807+a1@gmail.com",
        "admin@123"
      );

      // console.log(session);
      if (session) {
        router.push("/admin");
      }
      setShowLogin(false);
    } catch (err) {
      console.log(err.data);
    }
    setIsLoading(false);
  };

  const getDisabled = () => {
    if (otpSent) {
      if (otp.length !== 6) {
        return true;
      }
    }
    return mobile.length !== 10;
  };

  return (
    <Modal
      show={showLogin}
      centered
      className={styles.OtpVerify}
    >
      <Modal.Body className={styles.modal}>
        <X
          onClick={() => {
            setShowLogin(false);
          }}
          className={styles.x}
        />
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await login();
          }}
        >
          <div className={styles.body}>
            <h5>Admin Login</h5>
            <CustomInput label="Email" />
            <CustomInput label="Password" type="password" />
            <CustomButton isLoading={isLoading}>Login</CustomButton>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default OtpVerify;

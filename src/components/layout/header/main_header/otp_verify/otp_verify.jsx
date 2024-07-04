import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./otp_verify.module.scss";
import { Pencil, X } from "react-bootstrap-icons";
import axios from "axios";
import { auth } from "@/libs/firebase/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { useRouter } from "next/router";

const OtpVerify = ({ showLogin, setShowLogin }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [tempOtp, setTempOtp] = useState(null);

  const router = useRouter();

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      // const res = await axios.post("/api/auth/otp/send", {
      //   mobile,
      // });
      const newOtp = (Math.floor(Math.random() * 10000) + 10000)
        .toString()
        .substring(1);

      setTempOtp(newOtp);

      setOtpSent(true);
    } catch (error) {
      console.log(error?.response?.data);
    }
    setIsLoading(false);
  };

  const loginWithGoogleToken = async () => {
    setIsLoading(true);
    try {
      const token = await axios.post("/api/auth/getToken", {
        mobile,
      });
      const session = await signInWithCustomToken(auth, token.data.token);

      // console.log(session);
      if (session) {
        router.push("/candidate");
      }
      setShowLogin(false);
      setOtpSent(false);
    } catch (err) {
      console.log(err.data);
    }
    setIsLoading(false);
  };

  const verifyOtpAndLogin = async () => {
    setIsLoading(true);
    try {
      if (otp === tempOtp) {
        await loginWithGoogleToken();
      }
      //   const res = await axios.post("/api/auth/otp/verify", {
      //     otp,
      //   });
      //   if (res?.data?.valid) {
      //   }
    } catch (error) {
      console.log(error?.response?.data);
    }

    setIsLoading(false);
  };

  const getDisabled = () => {
    if (otpSent) {
      if (otp.length !== 4) {
        return true;
      }
    }
    return mobile.length !== 10;
  };

  return (
    <Modal
      show={showLogin}
      centered
      //   onHide={() => {
      //     setShowLogin(false);
      //   }}
      className={styles.OtpVerify}
    >
      <Modal.Body className={styles.modal}>
        <X
          onClick={() => {
            setShowLogin(false);
          }}
          className={styles.x}
        />
        <div className={styles.body}>
          <h5>{otpSent ? "Enter OTP" : "Enter Your Mobile Number"}</h5>
          {otpSent ? (
            <>
              <small>
                we have sent OTP to <strong>+91 {mobile}</strong>
                &nbsp;
                <Pencil
                  className={styles.edit}
                  onClick={() => {
                    setOtpSent(false);
                  }}
                />
              </small>
              <div>
                <CustomInput
                  placeHolder="OTP"
                  onChange={(e, v) => {
                    setOtp(v);
                  }}
                  value={otp}
                />
              </div>
              <small>
                Didn&apos;t get otp? <span onClick={sendOtp}>Resend</span>
              </small>
              <p>opt is {tempOtp}</p>
            </>
          ) : (
            <>
              <div>
                <p>+91 </p>
                <CustomInput
                  placeHolder="Eg: 7894561230"
                  value={mobile}
                  onChange={(e, v) => {
                    setMobile(v);
                  }}
                  maxLength={10}
                />
              </div>
              <small>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Cupiditate, nihil.
              </small>
            </>
          )}
          <hr />
          <CustomButton
            onClick={async () => {
              if (otpSent) {
                verifyOtpAndLogin();
              } else {
                sendOtp();
              }
            }}
            isLoading={isLoading}
            disabled={getDisabled()}
          >
            {otpSent ? "Verify OTP" : "Next"}{" "}
          </CustomButton>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OtpVerify;

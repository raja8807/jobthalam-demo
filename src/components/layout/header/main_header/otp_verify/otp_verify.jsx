import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import styles from "./otp_verify.module.scss";
import { Pencil, X } from "react-bootstrap-icons";
import axios from "axios";
import { auth } from "@/libs/firebase/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { useRouter } from "next/router";
import { useSendOtp } from "@/api_hooks/auth_hooks/auth.hooks";
// import { useSendOtp } from "@/api-hooks/auth_hooks/auth.hooks";

const OtpVerify = ({ showLogin, setShowLogin }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [isTestMode, setIsTesMode] = useState(
    process.env.NEXT_PUBLIC_ENV === "DEV"
  );

  console.log(process.env.NEXT_PUBLIC_ENV === "DEV");

  const clearStates = () => {
    setIsLoading(false);
    setMobile("");
    setOtp("");
    setOtpSent("");
  };

  const router = useRouter();

  const { mutateAsync } = useSendOtp();

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      await mutateAsync({ mobile, isTestMode });
      setOtpSent(true);
    } catch (error) {
      console.log(error?.response?.data);
    }
    setIsLoading(false);
  };

  const loginWithGoogleToken = async () => {
    setIsLoading(true);
    try {
      const token = await axios.post("/api/auth/verify", {
        mobile,
        otp,
      });

      const session = await signInWithCustomToken(auth, token?.data?.token);

      if (session) {
        router.push("/candidate");
      }
      setShowLogin(false);
      setOtpSent(false);
      clearStates();
    } catch (err) {
      console.log(err.response.data.message);
    }
    setIsLoading(false);
  };

  const verifyOtpAndLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogleToken();
    } catch (error) {
      console.log(error.message);
      console.log(error?.response?.data);
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
      onHide={() => {
        clearStates();
        setShowLogin(false);
      }}
      className={styles.OtpVerify}
    >
      <Modal.Body className={styles.modal}>
        <X
          onClick={() => {
            clearStates();
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
              {process.env.NEXT_PUBLIC_ENV === "DEV" && (
                <>
                  <Form.Check
                    label="Test Mode"
                    checked={isTestMode}
                    defaultChecked={isTestMode}
                    onChange={(e) => {
                      setIsTesMode(e.target.checked);
                    }}
                  />
                  {isTestMode && (
                    <small>
                      In test mode <b>123456</b> will be the OTP
                    </small>
                  )}
                </>
              )}
            </>
          )}
          <hr />
          <CustomButton
            onClick={async () => {
              if (otpSent) {
                await verifyOtpAndLogin();
              } else {
                await sendOtp();
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

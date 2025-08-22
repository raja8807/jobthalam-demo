import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomButton from "@/components/ui/custom_button/custom_button";
import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import styles from "./otp_verify.module.scss";
import { Pencil, X, Phone, Shield, ArrowLeft, Clock } from "react-bootstrap-icons";
import axios from "axios";
import { auth } from "@/libs/firebase/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { useRouter } from "next/router";
import { useSendOtp } from "@/api_hooks/auth_hooks/auth.hooks";

const OtpVerify = ({ showLogin, setShowLogin }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [isTestMode, setIsTesMode] = useState(
    process.env.NEXT_PUBLIC_ENV === "DEV"
  );

  const clearStates = () => {
    setIsLoading(false);
    setMobile("");
    setOtp(["", "", "", "", "", ""]);
    setOtpSent(false);
    setResendTimer(0);
  };

  const router = useRouter();
  const { mutateAsync } = useSendOtp();

  // Resend timer effect
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const sendOtp = async () => {
    setIsLoading(true);
    try {
      await mutateAsync({ mobile, isTestMode });
      setOtpSent(true);
      setResendTimer(30); // 30 seconds cooldown
    } catch (error) {
      console.log(error?.response?.data);
    }
    setIsLoading(false);
  };

  const loginWithGoogleToken = async () => {
    setIsLoading(true);
    try {
      const otpString = otp.join("");
      const token = await axios.post("/api/auth/verify", {
        mobile,
        otp: otpString,
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
      if (otp.some(digit => digit === "")) {
        return true;
      }
    }
    return mobile.length !== 10;
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      sendOtp();
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[data-index="${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
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
          {/* Header Section */}
          <div className={styles.header}>
            <div className={styles.iconWrapper}>
              {otpSent ? <Shield className={styles.headerIcon} /> : <Phone className={styles.headerIcon} />}
            </div>
            <h4 className={styles.title}>
              {otpSent ? "Enter OTP" : "Login"}
            </h4>
            <p className={styles.subtitle}>
              {otpSent 
                ? "Enter the 6-digit code sent to your mobile"
                : "Enter your mobile number to continue"
              }
            </p>
          </div>

          {/* Back Button for OTP Screen */}
      

          {/* Mobile Number Input */}
          {!otpSent ? (
            <div className={styles.inputSection}>
              <div className={styles.mobileInput}>
                <CustomInput
                  placeHolder="Enter mobile number"
                  value={mobile}
                  onChange={(e, v) => {
                    setMobile(v);
                  }}
                  maxLength={10}
                  variant={2}
                />
              </div>

              {/* Test Mode Toggle */}
              {process.env.NEXT_PUBLIC_ENV === "DEV" && (
                <div className={styles.testMode}>
                  <Form.Check
                    label="Test Mode"
                    checked={isTestMode}
                    defaultChecked={isTestMode}
                    onChange={(e) => {
                      setIsTesMode(e.target.checked);
                    }}
                  />
                  {isTestMode && (
                    <div className={styles.testModeInfo}>
                      <span className={styles.testBadge}>TEST</span>
                      <p>OTP: <strong>123456</strong></p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* OTP Input Section */
            <div className={styles.otpSection}>
              <div className={styles.mobileDisplay}>
                <span>+91 {mobile}</span>
                <button 
                  className={styles.editButton}
                  onClick={() => setOtpSent(false)}
                >
                  <Pencil className={styles.editIcon} />
                </button>
              </div>

              <div className={styles.otpInput}>
                <div className={styles.otpFields}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      data-index={index}
                      className={styles.otpField}
                      placeholder=""
                    />
                  ))}
                </div>
              </div>

              <div className={styles.resendSection}>
                {resendTimer > 0 ? (
                  <div className={styles.timer}>
                    <Clock className={styles.clockIcon} />
                    <span>Resend in {resendTimer}s</span>
                  </div>
                ) : (
                  <button 
                    className={styles.resendButton}
                    onClick={handleResend}
                  >
                    Didn&apos;t receive? <span>Resend</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className={styles.actionSection}>
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
              wFull
              variant={1}
            >
              {otpSent ? "Verify" : "Send OTP"}
            </CustomButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default OtpVerify;

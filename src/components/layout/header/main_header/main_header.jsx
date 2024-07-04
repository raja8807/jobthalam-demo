import CustomContainer from "@/components/ui/custom_container/custom_container";
import React, { useState } from "react";
import styles from "./main_header.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import User from "./user/user";
import OtpVerify from "./otp_verify/otp_verify";
import { auth } from "@/libs/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const MainHeader = ({ currentUser, session }) => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className={styles.MainHeader}>
      <OtpVerify showLogin={showLogin} setShowLogin={setShowLogin} />
      <CustomContainer>
        <div className={styles.wrap}>
          <div className={styles.left}>
            <div href="/" className={styles.logo}></div>
          </div>
          <div className={styles.right}>
            {!currentUser && !session && (
              <>
                <CustomButton
                  variant={1}
                  onClick={() => {
                    setShowLogin(true);
                  }}
                >
                  Employer Login
                </CustomButton>
              </>
            )}
            {session && !currentUser && (
              <CustomButton
                onClick={() => {
                  auth.signOut();
                }}
              >
                Logout
              </CustomButton>
            )}
            {session && currentUser && <User currentUser={currentUser} />}
          </div>
        </div>
      </CustomContainer>
    </header>
  );
};

export default MainHeader;

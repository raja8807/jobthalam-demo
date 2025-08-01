import CustomContainer from "@/components/ui/custom_container/custom_container";
import React, { useState } from "react";
import styles from "./main_header.module.scss";
import CustomButton from "@/components/ui/custom_button/custom_button";
import User from "./user/user";
import OtpVerify from "./otp_verify1/otp_verify";
import { auth } from "@/libs/firebase/firebase";
import CustomDropDown from "@/components/ui/dropdown/dropdown";
import { CaretDown, CaretDownFill } from "react-bootstrap-icons";

// const LoginDropDown = ({setShowLogin}) => {
//   return (
//     <div className={styles.LoginDropDown}>
//       <CustomDropDown
//         button={
//           <div className={styles.login_button}>
//             <p>
//               Login <CaretDownFill />
//             </p>
//           </div>
//         }
//         options={[
//           {
//             id: "xx",
//             title: "Login as Employer",
//             href:"https://jobthalam-employer.vercel.app/",
//             target:"_blank"
//           },
//           {
//             id: "aa",
//             title: "Login as Candidate",
//             variant: "primary",
//             onClick: () => {
//               setShowLogin(true);
//             },
//           },
//         ]}
//       />
//     </div>
//   );
// };

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
                <div className={styles.btns}>
                  <CustomButton
                    href="https://jobthalam-employer.vercel.app/"
                    variant={4}
                    target="_blank"
                  >
                    Employer Login
                  </CustomButton>
                  <CustomButton
                    onClick={() => {
                      setShowLogin(true);
                    }}
                  >
                    Candidate Login
                  </CustomButton>
                </div>
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

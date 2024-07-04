import React, { useState } from "react";
import styles from "./header_profile.module.scss";
import { BriefcaseFill, Pencil, X } from "react-bootstrap-icons";
import Link from "next/link";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { createClient } from "../../../../../../../utils/supabase/client";
import { auth } from "@/libs/firebase/firebase";

const HeaderProfile = ({ currentUser }) => {
  const [showPopup, setShowPopup] = useState(false);

  const getInitials = () => {
    let initial = "";
    if (currentUser?.first_name) {
      initial = `${currentUser?.first_name?.[0]?.toUpperCase()}`;
    }

    if (currentUser?.last_name) {
      initial = `${initial}${currentUser?.last_name?.[0]?.toUpperCase()}`;
    }

    return initial;
  };

  return (
    <div className={styles.HeaderProfile}>
      <div
        className={styles.dp}
        onClick={() => {
          setShowPopup((prev) => !prev);
        }}
      >
        {getInitials()}
      </div>
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.top}>
            <X
              onClick={() => {
                setShowPopup(false);
              }}
            />
            <div className={styles.dpl}>{getInitials()}</div>
          </div>
          <div className={styles.bottom}>
            <p className={styles.name}>
              {currentUser?.first_name} {currentUser?.last_name}
            </p>
            <small>{currentUser?.email}</small>
            <br />
            <small>
              <BriefcaseFill /> &nbsp; Employer
            </small>
            <br />
            <br />
            <Link
              href="/employer?t=2"
              onClick={() => {
                setShowPopup(false);
              }}
            >
              Update Profile <Pencil />
            </Link>
            <br />
            <br />
            <CustomButton
              onClick={async () => {
                auth.signOut();
                setShowPopup(false);
              }}
            >
              Sign Out
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderProfile;

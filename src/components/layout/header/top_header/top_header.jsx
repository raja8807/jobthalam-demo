import CustomContainer from "@/components/ui/custom_container/custom_container";
import React, { useState } from "react";
import styles from "./tom_header.module.scss";
import PAGES from "@/constants/pages";
import Link from "next/link";
import { useRouter } from "next/router";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { auth } from "@/libs/firebase/firebase";
import OtpVerify from "../main_header/otp_verify/otp_verify";
import { List } from "react-bootstrap-icons";

const TopHeader = ({ session, currentUser, isIsAdminPanel, setExpanded }) => {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className={styles.top_nav}>
      <OtpVerify showLogin={showLogin} setShowLogin={setShowLogin} />

      <CustomContainer>
        <div className={styles.wrap}>
          {isIsAdminPanel ? (
            <List
              onClick={() => {
                setExpanded((prev) => !prev);
              }}
            />
          ) : (
            <ul>
              {PAGES.map((p) => {
                if (p.isPortal) {
                  if (session) {
                    return (
                      <li
                        key={"portal"}
                        className={`${styles.item} ${
                          router.pathname === p.href ? styles.active : ""
                        }`}
                      >
                        <Link href={"/admin"}>Admin</Link>
                      </li>
                    );
                  }
                } else {
                  return (
                    <li
                      key={p.name}
                      className={`${styles.item} ${
                        router.pathname === p.href ? styles.active : ""
                      }`}
                    >
                      <Link href={p.href}>{p.name}</Link>
                    </li>
                  );
                }
              })}
            </ul>
          )}
          <div className={styles.right}>
            {!currentUser && !session && (
              <>
                <CustomButton
                  onClick={() => {
                    setShowLogin(true);
                  }}
                >
                  Admin Login
                </CustomButton>
              </>
            )}
            {session && !currentUser && (
              <CustomButton
                onClick={() => {
                  auth.signOut();
                  router.push("/");
                }}
              >
                Logout
              </CustomButton>
            )}
          </div>
        </div>
      </CustomContainer>
    </nav>
  );
};

export default TopHeader;

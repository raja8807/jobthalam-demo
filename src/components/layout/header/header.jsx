import CustomButton from "@/components/ui/custom_button/custom_button";
import styles from "./header.module.scss";
import { Image } from "react-bootstrap";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import Link from "next/link";
import { useRouter } from "next/router";
import PAGES from "@/constants/pages";
import User from "./main_header/user/user";
import { useState } from "react";
import OtpVerify from "./main_header/otp_verify/otp_verify";
import { List, PersonCircle } from "react-bootstrap-icons";
import HeaderDrawer from "./top_header/header_drawer/header_drawer";
import { auth } from "@/libs/firebase/firebase";
import InternShipFormModal from "@/components/ui/internship_form/internship_form";

const LogoutButton = ({ session, currentUser }) => {
  return (
    <>
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
    </>
  );
};

const Header = ({ currentUser, session, showLogin, setShowLogin }) => {
  const router = useRouter();

  const [showHeader, setShowHeader] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <header className={`${styles.header} `}>
      <OtpVerify showLogin={showLogin} setShowLogin={setShowLogin} />
      <InternShipFormModal
        show={showForm}
        setShow={setShowForm}
        setShowLogin={setShowLogin}
      />
      <CustomContainer>
        <div className={styles.wrap}>
          <div className={styles.logo}>
            <Image src="/logo/logo_f_v.png" width={200} alt="logo" />
            <div className={styles.menu}>
              <HeaderDrawer
                router={router}
                session={session}
                setShow={setShowHeader}
                show={showHeader}
              />
              {session ? (
                <LogoutButton currentUser={currentUser} session={session} />
              ) : (
                <List
                  onClick={() => {
                    setShowHeader(true);
                  }}
                />
              )}
            </div>
          </div>

          {router.pathname !== "/candidate" && (
            <nav>
              <ul>
                {PAGES.map((p) => {
                  if (p.hidden) {
                    return null
                  }
                  if (p.isPortal) {
                    if (session) {
                      return (
                        <li
                          key={"portal"}
                          className={`${styles.item} ${router.pathname === p.href ? styles.active : ""
                            }`}
                        >
                          <Link href={"/candidate"}>Candidate</Link>
                        </li>
                      );
                    }
                  } else {
                    return (
                      <li
                        key={p.name}
                        className={`${styles.item} ${router.pathname === p.href ? styles.active : ""
                          }`}
                      >
                        <Link href={p.href}>{p.name}</Link>
                      </li>
                    );
                  }
                })}
              </ul>
            </nav>
          )}
          <div className={styles.right}>
            {!currentUser && !session && (
              <>
                <div className={styles.btns}>

                  <CustomButton
                    onClick={() => {
                      setShowLogin(true);
                    }}
                  >
                    <p className={styles.login}>
                      <PersonCircle />
                      Candidate Login
                    </p>
                  </CustomButton>
                  &nbsp; &nbsp;
                  <CustomButton
                    onClick={() => {
                      setShowForm(true);
                    }}
                    variant={5}
                  >
                    {/* <div className={styles.badge}>New</div> */}
                    <p className={styles.login}>Register For Internships</p>
                  </CustomButton>
                </div>
              </>
            )}

            <div className={styles.logout_btn}>
              {session && (
                <LogoutButton currentUser={currentUser} session={session} />
              )}
            </div>
          </div>
        </div>
      </CustomContainer>
    </header>
  );
};

export default Header;

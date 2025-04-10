import CustomContainer from "@/components/ui/custom_container/custom_container";
import React, { useState } from "react";
import styles from "./tom_header.module.scss";
import PAGES from "@/constants/pages";
import Link from "next/link";
import { useRouter } from "next/router";
import { List } from "react-bootstrap-icons";
import HeaderDrawer from "./header_drawer/header_drawer";

const TopHeader = ({ session }) => {
  const router = useRouter();

  const [showHeader, setShowHeader] = useState(false);

  return (
    <nav className={styles.top_nav}>
      <CustomContainer>
        <div className={styles.wrap}>
          <div className={styles.left}>
            <div href="/" className={styles.logo}></div>
          </div>

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
                      <Link href={"/candidate"}>Candidate</Link>
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

          <HeaderDrawer
            show={showHeader}
            router={router}
            setShow={setShowHeader}
            session={session}
          />

          <List
            className={styles.menu}
            onClick={() => {
              setShowHeader(true);
            }}
          />
        </div>
      </CustomContainer>
    </nav>
  );
};

export default TopHeader;

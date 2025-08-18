import React from "react";
import { Image, Offcanvas } from "react-bootstrap";
import styles from "./header_drawer.module.scss";
import PAGES from "@/constants/pages";
import Link from "next/link";
// import DownloadButtons from "@/components/download_button/download_button";

const HeaderDrawer = ({ show, setShow, router, session }) => {
  // const PAGES = []

  return (
    <Offcanvas show={show} placement="end">
      <Offcanvas.Header
        className={styles.head}
        closeButton
        onHide={() => {
          setShow(false);
        }}
      >
        <Image src="/logo/logo_f_v.png" alt="logo" fluid width={150} />
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className={styles.body}>
          <nav>
            {PAGES.map((page) => {

if(page.hidden){
return null
}
              if (page.isPortal) {
                if (session) {
                  return (
                    // <li
                    //   key={"portal"}
                    //   className={`${styles.item} ${
                    //     router.pathname === page.href ? styles.active : ""
                    //   }`}
                    // >
                    <Link
                      key={"portal"}
                      href={"/candidate"}
                      className={
                        router.pathname === page.href ? styles.active : ""
                      }
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      Candidate
                    </Link>
                    // </li>
                  );
                }
              } else {
                return (
                  <Link
                    key={"portal"}
                    href={page.href}
                    className={
                      router.pathname === page.href ? styles.active : ""
                    }
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    {page.name}
                  </Link>
                );
              }
              // return (
              //   <Link
              //     href={page.href}
              //     key={page.name}
              //     className={router.pathname === page.href ? styles.active : ""}
              //     onClick={() => {
              //       setShow(false);
              //     }}
              //   >
              //     {page.name}
              //   </Link>
              // );
            })}
          </nav>

          <div>
            {/* <DownloadButtons isHeader/> */}
            {/* <Link
              href="/"
              onClick={() => {
                setShow(false);
              }}
            >
              <Image src="/assets/playbtn.png" alt="logo" fluid width={200} />
            </Link>
            <br />
            <br />
            <Link
              href="/"
              onClick={() => {
                setShow(false);
              }}
            >
              <Image src="/assets/apple.svg" alt="logo" fluid width={200} />
            </Link> */}
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default HeaderDrawer;

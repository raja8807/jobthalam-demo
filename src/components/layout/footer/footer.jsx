import React from "react";
import styles from "./footer.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Image, Row } from "react-bootstrap";
import Link from "next/link";
import PAGES from "@/constants/pages";
import { ArrowRight } from "react-bootstrap-icons";
import { useRouter } from "next/router";

const Footer = ({ session, setShowLogin }) => {
  const PRODUCTS = [
    {
      id: "MANGO",
      name: "Find a Job",
      href: "#",
      isCandidate: true,
    },
    {
      id: "MANGO",
      name: "Post a Job",
      href: "https://employer.jobthalam.com/",
    },

    {
      id: "dv",
      name: "Refund Policy",
      href: "/Refund-Policy",
    },
  ];

  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <CustomContainer>
        <Row>
          <Col xs={12} md={6} lg={5}>
            <div className={`${styles.sec} ${styles.sec1}`}>
              <Image
                src="/logo/logo_f_v.png"
                alt="logo"
                width={250}
                className={styles.logo}
              />
              {/* <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
                ad quos ratione asperiores qui molestiae itaque amet et
                reiciendis magni vel incidunt dolor libero, inventore,
                voluptatibus deserunt doloribus optio sit?
              </p> */}
            </div>
          </Col>
          <Col xs={6} md={6} lg={2}>
            <div className={`${styles.sec} ${styles.sec2}`}>
              <h4>Quick Links</h4>
              {PAGES.map((p) => {
                if (!p.isPortal) {
                  return (
                    <p key={p.name} className={styles.links}>
                      <Link href={p.href}>
                        <span>
                          <ArrowRight />
                          &nbsp;
                        </span>
                        {p.name}
                      </Link>
                    </p>
                  );
                }
              })}
            </div>
          </Col>
          <Col xs={6} md={6} lg={2}>
            <div className={`${styles.sec} ${styles.sec2}`}>
              <h4>Useful Links</h4>
              {PRODUCTS.map((p, i) => (
                <p key={p.name} className={styles.links}>
                  <Link
                    href={p.href}
                    onClick={() => {
                      if (p.isCandidate) {
                        if (!session) {
                          setShowLogin(true);
                        } else {
                          router.push("/candidate");
                        }
                      }
                    }}
                  >
                    <span>
                      <ArrowRight />
                      &nbsp;
                    </span>
                    {p.name}
                  </Link>
                </p>
              ))}
            </div>
          </Col>
        </Row>
        <hr />
        <div className={styles.legal}>
          <p>All rights reserved © 2025 Arvicomm Technologies.</p>
          <div>
            <Link hr href={"/terms-and-conditions"}>
              Terms & Conditions
            </Link>
            |
            <Link hr href={"/Privacy-Policy"}>
              Privacy policy
            </Link>
          </div>
        </div>
      </CustomContainer>
    </footer>
  );
};

export default Footer;

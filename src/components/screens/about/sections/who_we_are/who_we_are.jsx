import React from "react";
import styles from "./who_we_are.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Image, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import {
  Briefcase,
  Building,
  Buildings,
  Gear,
  People,
} from "react-bootstrap-icons";
import SectionHead from "@/components/ui/section_head/section_head";
import ClientsSection from "../clients/clients";
import CountSection from "../count/count";

const BCard = ({ data }) => {
  return (
    <div className={styles.BCard}>
      <div className={styles.c_left}>{data.icon}</div>
      <div className={styles.c_right}>
        <p>{data.num}</p>
        <small>{data.title}</small>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const bCards = [
    {
      id: "1",
      title: "Live Jobs",
      num: "100+",
      icon: <Briefcase />,
    },
    {
      id: "2",
      title: "Companies",
      num: "100+",
      icon: <Buildings />,
    },
    {
      id: "3",
      title: "Candidates",
      num: "100+",
      icon: <People />,
    },
  ];

  return (
    <div className={styles.AboutSection}>
      <div className={styles.BannerSection}>
        <CustomContainer>
          <div className={styles.wrap}>
            <div className={styles.left}>
              <h1>
                About <span>Jobthalam</span>
              </h1>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                iste debitis quidem, cupiditate voluptate quasi. Temporibus
                animi ipsam incidunt repudiandae? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Adipisci aliquid quo repellendus
                officia eum cupiditate ex asperiores a eveniet sequi?
              </p>
            </div>

            <div className={styles.right}>
              <Image src="/logo/logo_f_v.png" alt="hero" fluid />
            </div>
          </div>
        </CustomContainer>
      </div>

      <div className={styles.sec}>
        <CustomContainer>
          <Row>
            <Col md={6}>
              <div className={styles.txt}>
                <h2>Who We Are</h2>
                <h3>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Repellat, harum?
                </h3>
                <p>
                  Jobthalam is an all-inclusive online job search portal created
                  to connect jobseekers with potential employers by providing a
                  comprehensive and easy-to-use service for discovering
                  employment opportunities
                </p>
              </div>
            </Col>
            <Col>
              <Image src="/assets/abt_banner.svg" alt="hero" fluid />
            </Col>
          </Row>
        </CustomContainer>
      </div>
      <br />
      <br />
      <ClientsSection />
      <div className={styles.strn}>
        <div className={styles.sec}>
          <CustomContainer>
            <Row>
              <Col>
                <Image src="/assets/abt_banner.svg" alt="hero" fluid />
              </Col>
              <Col md={6}>
                <div className={styles.txt}>
                  <h2>What’s Our Strength</h2>
                  <h3>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Repellat, harum?
                  </h3>
                  <p>
                    On average, jobseekers spend between 4.5 to 6 months
                    searching for employment, often exploring a minimum of 15
                    job portals and subscribing to job notifications. With
                    Jobthalam, you can get your perfect job alerts through
                    Whatsapp Instantly without any hassle and loss of money,
                    considerably reducing the amount of time typically spent
                    searching for work.
                  </p>
                </div>
              </Col>
            </Row>
          </CustomContainer>
        </div>
      </div>

      <CountSection />

      <div className={styles.sec}>
        <CustomContainer>
          <Row>
            <Col md={6}>
              <div className={styles.txt}>
                <h2>What’s Our Strength</h2>
                <h3>
                  Jobthalam is driven by the goal of streamlining and expediting
                  the job search process for individuals throughout India.
                </h3>
                <p>
                  With a focus on improving the efficiency, personalisation and
                  accessibility of the job search experience, Jobthalam aims to
                  change the way people approach the job search process,
                  minimising the time and effort traditionally required.
                  <br />
                  <br />
                  Most of the job portal companies in India are wasting job
                  seekers time, extort money, cause them mental anguish and do
                  not provide them with proper job Alerts. Jobthalam does not
                  give job seekers such problems and provides accurate job
                  alerts through WhatsApp in two seconds.
                </p>
              </div>
            </Col>

            <Col>
              <Image src="/assets/abt_banner.svg" alt="hero" fluid />
            </Col>
          </Row>
        </CustomContainer>
      </div>
    </div>
  );
};

export default AboutSection;

import React from "react";
import styles from "./banner.module.scss";
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

const BCard = ({ data }) => {
  return (
    <Col xs={6} md={3}>
      <div className={styles.BCard}>
        <div className={styles.c_left}>{data.icon}</div>
        <div className={styles.c_right}>
          <p>{data.num}</p>
          <small>{data.title}</small>
        </div>
      </div>
    </Col>
  );
};

const BannerSection = () => {
  const bCards = [
    {
      id: "1",
      title: "Live Jobs",
      num: "10,000",
      icon: <Briefcase />,
    },
    {
      id: "2",
      title: "Companies",
      num: "10,000",
      icon: <Buildings />,
    },
    {
      id: "3",
      title: "Candidates",
      num: "10,000",
      icon: <People />,
    },
    {
      id: "4",
      title: "New Jobs",
      num: "10,000",
      icon: <Briefcase />,
    },
  ];

  return (
    <div className={styles.BannerSection}>
      <CustomContainer>
        <div className={styles.wrap}>
          <div className={styles.left}>
            <h1>Find the job that suits your interest and skills</h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad iste
              debitis quidem, cupiditate voluptate quasi. Temporibus animi ipsam
              incidunt repudiandae?
            </p>

            <div>
              <CustomButton href="/portal">Get Started</CustomButton>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <CustomButton variant={2}>Know More</CustomButton>
            </div>
          </div>

          <div className={styles.right}>
            <Image src="/assets/svg/hero2.svg" alt="hero" fluid />
          </div>
        </div>
        <Row className={styles.card_wrap}>
          {bCards.map((c) => (
            <BCard key={c.id} data={c} />
          ))}
        </Row>
      </CustomContainer>
    </div>
  );
};

export default BannerSection;

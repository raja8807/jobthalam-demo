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
      <div className={styles.BCard}>
        <div className={styles.c_left}>{data.icon}</div>
        <div className={styles.c_right}>
          <p>{data.num}</p>
          <small>{data.title}</small>
        </div>
      </div>
  );
};

const BannerSection = () => {
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
    <div className={styles.BannerSection}>
      <CustomContainer>
        <div className={styles.wrap}>
          <div className={styles.left}>
            <h1>
              The Easy Way To Get Your <span>New Job</span>
            </h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad iste
              debitis quidem, cupiditate voluptate quasi. Temporibus animi ipsam
              incidunt repudiandae?
            </p>

            <div>
              <CustomButton>Get Started</CustomButton>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <CustomButton variant={2}>Know More</CustomButton>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.card}>
              <div>
                <Briefcase />
              </div>
              <div>
                <p>
                  120+ Jobs
                  <br />
                  Post Daily
                </p>
              </div>
            </div>
            <Image src="/assets/hero1.png" alt="hero" fluid />
          </div>
        </div>
      </CustomContainer>
      <div className={styles.cards}>
        <CustomContainer>
          <div className={styles.card_wrap}>
            {bCards.map((c) => (
              <BCard key={c.id} data={c} />
            ))}
          </div>
        </CustomContainer>
      </div>
    </div>
  );
};

export default BannerSection;

import React from "react";
import styles from "./banner.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Image, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";

import * as Icons from "react-bootstrap-icons";

const BCard = ({ data }) => {
  const getIcon = (name) => {
    const Icon = Icons[name];
    return Icon ? <Icon /> : <Icons.Briefcase />; // Fallback to a default icon
  };

  return (
    <div className={styles.BCard}>
      <div className={styles.c_left}>{getIcon(data.icon)}</div>
      <div className={styles.c_right}>
        <p>{data.num}</p>
        <small>{data.title}</small>
      </div>
    </div>
  );
};

const BannerSection = ({ bannerData, setShowLogin, session }) => {
  return (
    <div className={styles.BannerSection}>
      <CustomContainer>
        <div className={styles.wrap}>
          <div className={styles.left}>
            <h1>
              {/* The Easy Way To Get Your <span>New Job</span> */}

              {bannerData?.title &&
                bannerData?.title?.map((e, i) => {
                  if (e.tag === "highlight") {
                    return <span key={`x_${i}`}>{e.text}&nbsp;</span>;
                  }
                  return <x key={`x_${i}`}>{e.text}&nbsp;</x>;
                })}
            </h1>

            <p>{bannerData?.caption}</p>

            <div>
              <CustomButton
                href={session && "/candidate"}
                onClick={() => {
                  if (!session) {
                    setShowLogin(true);
                  }
                }}
              >
                Get Started
              </CustomButton>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <CustomButton variant={2} href={"/about"}>
                Know More
              </CustomButton>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.card}>
              <div>
                <Icons.Briefcase />
              </div>
              <div>
                <p>
                  120+ Jobs
                  <br />
                  Post Daily
                </p>
              </div>
            </div>
            <Image src={bannerData.image} alt="hero" fluid />
          </div>
        </div>
      </CustomContainer>
      {bannerData?.cards?.[0] && (
        <div className={styles.cards}>
          <CustomContainer>
            <div className={styles.card_wrap}>
              {bannerData.cards.map((c) => (
                <BCard key={c.id} data={c} />
              ))}
            </div>
          </CustomContainer>
        </div>
      )}
    </div>
  );
};

export default BannerSection;

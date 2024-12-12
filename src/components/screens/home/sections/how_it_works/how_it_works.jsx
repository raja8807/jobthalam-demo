import CustomContainer from "@/components/ui/custom_container/custom_container";
import React from "react";
import styles from "./how_it_works.module.scss";
import {
  Briefcase,
  CurrencyRupee,
  Pencil,
  PersonAdd,
  Whatsapp,
} from "react-bootstrap-icons";
import { Col, Image, Row } from "react-bootstrap";

const HCard = ({ data, isWhite, isLast, isTwo }) => {
  const { title, caption, icon } = data;
  return (
    <Col xs={12} md={6} lg={3}>
      <div className={`${styles.HCard} ${isWhite ? styles.white : ""} `}>
        <div className={styles.ico}>{icon}</div>
        <p>{title}</p>
        <small>{caption}</small>
        {!isLast && (
          <Image
            src="/assets/svg/arrow.svg"
            alt="arrow"
            fluid
            className={`${isTwo ? styles.two : ""}`}
          />
        )}
      </div>
    </Col>
  );
};

const HowItWorks = () => {
  const hCards = [
    {
      id: "1",
      title: "Create Account & Update Your Profile",
      icon: <PersonAdd />,
      caption:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, rem.",
    },
    {
      id: "2",
      title: "Get Personalized Job Posting For Free",
      icon: <Briefcase />,
      caption:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, rem.",
      //   isWhite: true,
    },
    {
      id: "3",
      title: "Complete Payment Starting at Just 99/-",
      icon: <CurrencyRupee />,
      caption:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, rem.",
    },
    {
      id: "4",
      title: "Get Jobs Directly To Whatsapp",
      icon: <Whatsapp />,
      caption:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste, rem.",
      isWhite: true,
    },
  ];

  return (
    <div className={styles.HowItWorks}>
      <CustomContainer>
        <div>
          <h2>
            How <span>Jobthalam</span> Works
          </h2>
        </div>
        <br />
        <Row>
          {hCards.map((c, i) => (
            <HCard
              key={c.id}
              isWhite={c.isWhite}
              data={c}
              isLast={i === 3}
              isTwo={i === 1}
            />
          ))}
        </Row>
      </CustomContainer>
    </div>
  );
};

export default HowItWorks;

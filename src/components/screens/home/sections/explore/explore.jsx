import React from "react";
import styles from "./explore.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Row } from "react-bootstrap";
import { Briefcase } from "react-bootstrap-icons";

const Card = () => {
  return (
    <Col xs={6} md={3} lg={4}>
      <div className={styles.Card}>
        <Briefcase />
        <p>Design</p>
        <small>222 Jobs Available</small>
      </div>
    </Col>
  );
};

const ExploreSection = () => {
  const cards = [
    {
      id: "zdvm",
    },
    {
      id: "zdvm",
    },
    {
      id: "zdvm",
    },
    {
      id: "zdvm",
    },
    {
      id: "zdvm",
    },
    {
      id: "zdvm",
    },
  ];

  return (
    <section className={styles.ExploreSection}>
      <CustomContainer>
        <h2>
          Explore By <span>Category</span>
        </h2>
        <div className={styles.cards}>
          <Row>
            {cards.map((card) => {
              return <Card key={card.id} />;
            })}
          </Row>
        </div>
      </CustomContainer>
    </section>
  );
};

export default ExploreSection;

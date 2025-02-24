import React from "react";
import styles from "./explore.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Row } from "react-bootstrap";
import { Briefcase } from "react-bootstrap-icons";

const Card = ({ data }) => {
  return (
    <Col xs={6} md={3} lg={4}>
      <div className={styles.Card}>
        <Briefcase />
        <p>{data.title}</p>
        <small>{data.availableJobs} Jobs Available</small>
      </div>
    </Col>
  );
};

const ExploreSection = ({ categoryData = [] }) => {
  return (
    <section className={styles.ExploreSection}>
      <CustomContainer>
        <h2>
          Explore By <span>Category</span>
        </h2>
        <div className={styles.cards}>
          <Row>
            {categoryData.map((card, i) => {
              return <Card key={`card_${i}`} data={card} />;
            })}
          </Row>
        </div>
      </CustomContainer>
    </section>
  );
};

export default ExploreSection;

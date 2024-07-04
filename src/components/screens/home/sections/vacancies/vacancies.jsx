import React from "react";
import styles from "./vacancies.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Row } from "react-bootstrap";

const VCard = ({ data }) => {
  const { title, positions } = data;

  return (
    <Col xs={6} md={3}>
      <div className={styles.VCard}>
        <p>{title}</p>
        <small>{positions} Open Positions</small>
      </div>
    </Col>
  );
};

const VacanciesSection = () => {
  const vCards = [
    {
      id: "1",
      title: "IT Managers",
      positions: 1000,
    },
    {
      id: "2",
      title: "Surgeons",
      positions: 1500,
    },
    {
      id: "3",
      title: "Web Developer",
      positions: 600,
    },
    {
      id: "4",
      title: "Data Scientist",
      positions: 1200,
    },
  ];

  return (
    <div className={styles.CategorySection}>
      <CustomContainer>
        <div>
          <h1>Most Popular Vacancies</h1>
        </div>
        <br />
        <Row>
          {vCards.map((c) => (
            <VCard key={c.id} data={c} />
          ))}
        </Row>
      </CustomContainer>
    </div>
  );
};

export default VacanciesSection;

import React from "react";
import styles from "./vacancies.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Row } from "react-bootstrap";

const VCard = ({ data }) => {
  const { title, positions } = data;

  return (
    <div className={styles.VCard}>
      <p>{title}</p>
      <small>{positions} Open Positions</small>
    </div>
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
        <div className={styles.scroller}>
          <div className={styles.scrollHolder}>
            {vCards.map((c) => (
              <VCard key={c.id} data={c} />
            ))}
            {vCards.map((c) => (
              <VCard key={`${c.id}+1`} data={c} />
            ))}
            {vCards.map((c) => (
              <VCard key={`${c.id}+2`} data={c} />
            ))}
            {vCards.map((c) => (
              <VCard key={`${c.id}+3`} data={c} />
            ))}
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default VacanciesSection;

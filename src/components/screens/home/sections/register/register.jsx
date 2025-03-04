import React from "react";
import styles from "./register.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { ArrowRight } from "react-bootstrap-icons";

const RegisterSection = ({ cards = [] }) => {
  return (
    <div className={styles.RegisterSection}>
      <CustomContainer>
        <Row>
          {cards.map((card, cIdx) => {
            return (
              <Col xs={12} lg={6} key={`card_${cIdx}`}>
                <div className={`${styles.card} ${styles[`card${cIdx + 1}`]}`}>
                  <h2>{card.head}</h2>
                  <p>{card.text}</p>
                  <CustomButton variant={cIdx % 2 ? 1 : 3} href={card.link}>
                    {card.btnTxt}
                    <ArrowRight />
                  </CustomButton>
                </div>
              </Col>
            );
          })}
        </Row>
      </CustomContainer>
    </div>
  );
};

export default RegisterSection;

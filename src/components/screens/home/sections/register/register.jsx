import React from "react";
import styles from "./register.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { ArrowRight } from "react-bootstrap-icons";

const RegisterSection = () => {
  return (
    <div className={styles.RegisterSection}>
      <CustomContainer>
        <Row>
          <Col xs={12} lg={6}>
            <div className={`${styles.card} ${styles.card1}`}>
              <h2>Become a Candidate</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Perferendis, animi. Quisquam dolores sapiente culpa. Quam
                deleniti deserunt itaque sint dignissimos.
              </p>
              <CustomButton variant={3}>
                Register as a Candidate
                <ArrowRight />
              </CustomButton>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className={`${styles.card} ${styles.card2}`}>
              <h2>Become an Employer</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Perferendis, animi. Quisquam dolores sapiente culpa. Quam
                deleniti deserunt itaque sint dignissimos.
              </p>
              <CustomButton variant={1}>
                Register as an Employer
                <ArrowRight />
              </CustomButton>
            </div>
          </Col>
        </Row>
      </CustomContainer>
    </div>
  );
};

export default RegisterSection;

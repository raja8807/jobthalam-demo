import React, { useState } from "react";
import styles from "./faq.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { FileMinus, Plus, X } from "react-bootstrap-icons";
import { Col, Image, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";

const Faq = ({ setShowAnsIndex, showAnsIndex, data, index }) => {
  const isOpened = showAnsIndex === index;

  return (
    <div
      onClick={() => {
        setShowAnsIndex(isOpened ? null : index);
      }}
      className={styles.Faq}
    >
      <div className={styles.question}>
        {data.question} {!isOpened ? <Plus /> : <X />}
      </div>
      {isOpened && <div className={styles.answer}>{data.answer}</div>}
    </div>
  );
};

const FaqSection = ({faqs=[]}) => {
 

  // const faqs = [
  //   {
  //     id: "adf",
  //     question: "How do I create account?",
  //     answer:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, fugiat.",
  //   },
  //   {
  //     id: "adf",
  //     question: "How do I upload resume?",
  //     answer:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, fugiat.",
  //   },
  //   {
  //     id: "adf",
  //     question:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, fugiat.",
  //     answer:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, fugiat.",
  //   },
  //   {
  //     id: "adf",
  //     question:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, fugiat.",
  //     answer:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, fugiat.",
  //   },
  //   {
  //     id: "adf",
  //     question:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, fugiat.",
  //     answer:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, fugiat.",
  //   },
  //   {
  //     id: "adf",
  //     question: "How do I create account?",
  //     answer:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, fugiat.",
  //   },
  //   {
  //     id: "adf",
  //     question: "How do I upload resume?",
  //     answer:
  //       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, fugiat.",
  //   },
  // ];

  const [showAnsIndex, setShowAnsIndex] = useState(null);

  return (
    <section className={styles.FaqSection}>
      <CustomContainer>
        <h2>
          Frequently Asked <span>Questions</span>
        </h2>
        <br />
        <br />
        <Row>
          <Col xs={12} md={7}>
            <div className={styles.faq}>
              {faqs.map((faq, index) => (
                <Faq
                  key={`faq_index`}
                  setShowAnsIndex={setShowAnsIndex}
                  showAnsIndex={showAnsIndex}
                  data={faq}
                  index={index}
                />
              ))}
            </div>
          </Col>
          <Col xs={12} md={5}>
            <div className={styles.right}>
              <Image src="/logo/logo_s.png" width={100} />
              <h3>Do you have more questions?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                distinctio illum itaque quidem sunt est fuga, laborum veritatis
                voluptate enim.
              </p>
              <CustomButton>Contact Us</CustomButton>
            </div>
          </Col>
        </Row>
      </CustomContainer>
    </section>
  );
};

export default FaqSection;

import React, { useState } from "react";
import styles from "./contact.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Form } from "react-bootstrap";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomTextArea from "@/components/ui/custom_textarea/custom_textarea";
import CustomButton from "@/components/ui/custom_button/custom_button";
import FaqSection from "../home/sections/faq/faq";
import NewsLetterSection from "../home/sections/news_letter/news_letter";

const ContactScreen = ({
  candidateFaqData,
  candidateContactData = {
    head: "We Care About Customer Service",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Corporis perferendis, voluptas quos quaerat incidunt harum?Dolor eum modi doloremque sunt minima, laudantium, numquamquidem soluta, adipisci ea eaque cupiditate nisi!",
  },
}) => {
  const [values, setValues] = useState({
    phone: "",
    isCandidate: true,
  });

  return (
    <>
      <div className={styles.ContactScreen}>
        <CustomContainer>
          <div className={styles.wrap}>
            <div className={styles.box}>
              <div className={styles.left}>
                <div>
                  <h3>{candidateContactData?.head}</h3>
                  <p>{candidateContactData?.text}</p>
                  <CustomButton variant={2}>Email Support</CustomButton>
                </div>
              </div>
              <div className={styles.right}>
                <form>
                  <h3>Get In Touch</h3>
                  <CustomInput placeHolder="Name" />
                  <CustomInput placeHolder="Email" />
                  <CustomInput placeHolder="Phone Number" pre="+91" />
                  <CustomTextArea placeHolder="Description" />
                  <div className={styles.check}>
                    <Form.Check
                      type="checkBox"
                      label="Candidate"
                      checked={values.isCandidate}
                      onChange={(e) => {
                        setValues((prev) => ({
                          ...prev,
                          isCandidate: e.target.checked,
                        }));
                      }}
                    />
                    <Form.Check
                      type="checkBox"
                      label="Recruiter"
                      checked={!values.isCandidate}
                      onChange={(e) => {
                        setValues((prev) => ({
                          ...prev,
                          isCandidate: !e.target.checked,
                        }));
                      }}
                    />
                  </div>
                  <CustomButton>Submit</CustomButton>
                </form>
              </div>
            </div>
          </div>
        </CustomContainer>
      </div>
      <FaqSection faqs={candidateFaqData} />
      <br />
      <br />
      <br />
      <br />
      <NewsLetterSection />
    </>
  );
};

export default ContactScreen;

import React from "react";
import styles from "./contact.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Row } from "react-bootstrap";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import CustomTextArea from "@/components/ui/custom_textarea/custom_textarea";
import CustomButton from "@/components/ui/custom_button/custom_button";
import Footer from "@/components/layout/footer/footer";
import FaqSection from "../home/sections/faq/faq";
import NewsLetterSection from "../home/sections/news_letter/news_letter";

const ContactScreen = ({candidateFaqData}) => {
  const candidateContactData = {
    head: "We Care About Customer Service",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Corporis perferendis, voluptas quos quaerat incidunt harum?Dolor eum modi doloremque sunt minima, laudantium, numquamquidem soluta, adipisci ea eaque cupiditate nisi!",
  };

  return (
    <>
      <div className={styles.ContactScreen}>
        <CustomContainer>
          <div className={styles.wrap}>
            <div className={styles.box}>
              <div className={styles.left}>
                <div>
                  <h3>{candidateContactData.head}</h3>
                  <p>{candidateContactData.text}</p>
                  <CustomButton variant={2}>Email Support</CustomButton>
                </div>
              </div>
              <div className={styles.right}>
                <form>
                  <h3>Get In Touch</h3>
                  <CustomInput placeHolder="Name" />
                  <CustomInput placeHolder="Email" />
                  <CustomInput placeHolder="Subject" />
                  <CustomTextArea placeHolder="Message" />
                  <CustomButton>Submit</CustomButton>
                </form>
              </div>
            </div>
          </div>
        </CustomContainer>
      </div>
      <FaqSection faqs={candidateFaqData}/>
      <br/>
      <br/>
      <br/>
      <br/>
      <NewsLetterSection/>
      <Footer />
    </>
  );
};

export default ContactScreen;

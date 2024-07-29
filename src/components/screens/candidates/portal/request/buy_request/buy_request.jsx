import CustomButton from "@/components/ui/custom_button/custom_button";
import MainFrame from "@/components/ui/main_frame/main_frame";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./buy_request.module.scss";
import { CheckCircleFill } from "react-bootstrap-icons";
import PaymentPortal from "./payment/payment";

const Package = ({ data, setShowPaymentFor, currentUser }) => {
  const { title, price, text, features, isRecommended, isFree } = data;

  const disabled = isFree && currentUser.free_requested;

  return (
    <Col sm={12} md={6} lg={4}>
      <div
        className={`${styles.Package} ${
          isRecommended ? styles.recommended : ""
        } ${disabled && styles?.disabled}`}
      >
        <div className={styles.reco}>{isRecommended && "Recommended"}</div>
        <div className={styles.wrap}>
          <h1>{title}</h1>
          <p className={styles.price}>
            <span className={styles.ico}>&#8377;</span>
            <span className={styles.amount}>{price}</span>
            <span className={styles.mo}>/mo</span>
          </p>
          <p className={styles.text}>{text}</p>
          <div className={styles.btn}>
            <CustomButton
              variant={isFree ? 2 : 1}
              onClick={() => {
                if (!disabled) {
                  setShowPaymentFor(data);
                }
              }}
              disabled={disabled}
            >
              Buy Now
            </CustomButton>
          </div>

          <div className={styles.list}>
            <ul>
              {features.map((f, i) => (
                <li key={`feat_${i}`}>
                  <div>
                    <CheckCircleFill />
                    <span>{f.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Col>
  );
};

const BuyRequests = ({
  setShowHistory,
  currentUser,
  setCurrentUser,
  setCurrentTabIndex,
}) => {
  const packages = [
    {
      id: "mgsmrkmgksmlrm",
      title: "SILVER",
      isFree: true,
      price: "0",
      count: 2,
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, ianegk",
      features: [
        {
          text: "2 Job Alerts",
          check: true,
        },
        {
          text: "Dashboard Access",
          check: true,
        },
        {
          text: "View recruiter Phone No.",
          check: true,
        },
        {
          text: "View recruiter Email",
          check: true,
        },
        {
          text: "Detailed job description",
          check: true,
        },
      ],
    },

    {
      id: "1aiev",
      title: "PLATINUM",
      price: "299",
      count: 30,
      isFree: false,

      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, ianegk",
      features: [
        {
          text: "30 Assured Job Alerts",
          check: true,
        },
        {
          text: "Dashboard Access",
          check: true,
        },
        {
          text: "View recruiter Phone No.",
          check: true,
        },
        {
          text: "View recruiter Email",
          check: true,
        },
        {
          text: "Detailed job description",
          check: true,
        },
      ],
      isRecommended: true,
    },

    {
      id: "akefnk",
      title: "GOLD",
      price: "99",
      count: 10,
      isFree: false,

      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, ianegk",
      features: [
        {
          text: "10 Assured Job Alerts",
          check: true,
        },
        {
          text: "Dashboard Access",
          check: true,
        },
        {
          text: "View recruiter Phone No.",
          check: true,
        },
        {
          text: "View recruiter Email",
          check: true,
        },
        {
          text: "Detailed job description",
          check: true,
        },
      ],
    },
  ];

  const [showPaymentFor, setShowPaymentFor] = useState(null);

  return (
    <MainFrame>
      {showPaymentFor ? (
        <div>
          <PaymentPortal
            packageData={showPaymentFor}
            currentUser={currentUser}
            setShowPaymentFor={setShowPaymentFor}
            setCurrentUser={setCurrentUser}
            setCurrentTabIndex={setCurrentTabIndex}
          />
        </div>
      ) : (
        <div className={styles.BuyRequests}>
          <CustomButton
            onClick={() => {
              setShowHistory(true);
            }}
            variant={2}
          >
            View Request History
          </CustomButton>
          <br />
          <Row>
            {packages.map((pack) => (
              <Package
                key={pack.id}
                data={pack}
                setShowPaymentFor={setShowPaymentFor}
                currentUser={currentUser}
              />
            ))}
          </Row>
        </div>
      )}
    </MainFrame>
  );
};

export default BuyRequests;

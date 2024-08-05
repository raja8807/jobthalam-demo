import React, { useState } from "react";
import styles from "./payment.module.scss";
import { Lock } from "react-bootstrap-icons";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import { Col, Form, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { useCreatePayment } from "@/hooks/payment_hooks/payment_hooks";
import { v4 } from "uuid";
import { useRouter } from "next/router";
// import ConfirmPopup from "@/components/ui/popups/confirm_popup/confirm_popup";

const PaymentPortal = ({
  currentUser,
  packageData,
  setShowPaymentFor,
  setCurrentUser,
  setCurrentTabIndex,
}) => {
  const { price, title, count, isFree } = packageData;

  const { mutateAsync, isLoading: paymentIsLoading } = useCreatePayment();
  const isLoading = paymentIsLoading;
  // createRequestIsLoading || updateUserIsLoading || paymentIsLoading;

  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter();

  const purchaseRequest = async () => {
    try {
      let paymentId = v4();

      const res = await mutateAsync({
        payment: {
          payment_id: paymentId,
          employer_id: currentUser.id,
          count,
        },
        employer: {
          ...currentUser,
          jobs_pending: currentUser.jobs_pending + count,
        },
      });

      if (res?.data) {
        router.reload();
      }
      // if (!currentUser?.free_requested) {
      //   if (res.data) {
      //     const updatedUser = await updateUserAsync({
      //       ...currentUser,
      //       free_requested: true,
      //     });
      //     setCurrentUser(updatedUser.data);
      //   }
      // }
      //   setShowSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.PaymentPortal}>
      {/* <ConfirmPopup
        show={showSuccess}
        message="Purchase Completed. Please wait for our admins to find right jobs for you"
        head="Thank you!"
        setShow={() => {}}
        onConfirm={() => {
          setCurrentTabIndex(0);
        }}
        hasCancel={false}
      /> */}
      {isLoading && <LoadingScreen />}
      <div className={styles.wrap}>
        <h1>
          <Lock />
          Complete Payment
        </h1>

        <Row>
          <Col xs={12}>
            <div className={styles.info}>
              <h5>Profile</h5>
              <div>
                <CustomInput value={currentUser.first_name} disabled />
                <CustomInput value={currentUser.last_name} disabled />
              </div>
              <CustomInput value={currentUser.company_name} disabled />
              <CustomInput value={currentUser.email} disabled />
              <CustomInput value={currentUser.phone_number} disabled />
            </div>
            <br />
          </Col>

          <Col xs={12}>
            <div className={styles.info}>
              <h5>Package</h5>

              <h4>Name : {title}</h4>
              <h4>
                Price &nbsp;&nbsp;: <span>&#8377; {price}</span>
              </h4>
              <h4>Jobs &nbsp;&nbsp;&nbsp;: {count} Job Posting(s)</h4>
            </div>
            <br />
          </Col>
        </Row>

        <div className={styles.info}>
          <h5>Confirm Purchase</h5>

          <div>
            <div>
              <Form.Check />
              <p>Agree to terms and conditions</p>
            </div>
          </div>
          <br />
          <hr />
          <br />
          <CustomButton onClick={purchaseRequest} isLoading={isLoading}>
            Complete Payment
          </CustomButton>
          <CustomButton
            variant={2}
            onClick={() => {
              setShowPaymentFor(null);
            }}
          >
            Back To Packages
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default PaymentPortal;

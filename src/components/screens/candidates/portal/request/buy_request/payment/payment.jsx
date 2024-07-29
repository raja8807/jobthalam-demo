import React, { useState } from "react";
import styles from "./payments.module.scss";
import { Lock } from "react-bootstrap-icons";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import { Col, Form, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import { useCreateRequest } from "@/hooks/request_hooks/request_hooks";
import { useUpdateCandidate } from "@/hooks/candidate_hooks/candidate_hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { useCreatePayment } from "@/hooks/payment_hooks/payment_hooks";
import { v4 } from "uuid";
import ConfirmPopup from "@/components/ui/popups/confirm_popup/confirm_popup";
import { useRouter } from "next/router";

const PaymentPortal = ({
  currentUser,
  packageData,
  setShowPaymentFor,
  setCurrentUser,
  setCurrentTabIndex,
}) => {
  const { price, title, count, isFree } = packageData;

  const { mutateAsync, isLoading: createRequestIsLoading } = useCreateRequest();
  const { mutateAsync: updateUserAsync, isLoading: updateUserIsLoading } =
    useUpdateCandidate();

  const { mutateAsync: createPayment, isLoading: paymentIsLoading } =
    useCreatePayment();

  const isLoading =
    createRequestIsLoading || updateUserIsLoading || paymentIsLoading;

  const [showSuccess, setShowSuccess] = useState(false);

  const purchaseRequest = async () => {
    try {
      let paymentId = null;
      if (!isFree) {
        const pId = v4();
        const paymentRes = await createPayment({
          candidate_id: currentUser?.id,
          payment_id: pId,
        });
        paymentId = paymentRes.id;
      }

      const res = await mutateAsync({
        request: {
          candidate_id: currentUser.id,
          count: packageData.count,
          payment_id: paymentId,
          jobs_sent: 0,
          is_free: isFree,
        },
        currentUser,
      });

      if (!currentUser?.free_requested) {
        if (res.data) {
          const updatedUser = await updateUserAsync({
            ...currentUser,
            free_requested: true,
          });
          setCurrentUser(updatedUser.data);
        }
      }

      setShowSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

  return (
    <div className={styles.PaymentPortal}>
      <ConfirmPopup
        show={showSuccess}
        message={
          <p>
            Purchase Completed. Please wait for our admins to find right jobs
            for you
            <br />
            Refresh the page or click &quot;Ok&quot; to refresh.
          </p>
        }
        head="Thank you!"
        setShow={() => {}}
        onConfirm={() => {
          setCurrentTabIndex(0);
          router.reload();
        }}
        hasCancel={false}
      />
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
                Price &nbsp;&nbsp;: <span>&#8377; {price}/mo</span>
              </h4>
              <h4>Jobs &nbsp;&nbsp;: {count} Job Alerts</h4>
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

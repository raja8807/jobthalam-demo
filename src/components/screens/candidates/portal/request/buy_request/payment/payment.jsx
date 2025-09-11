import React, { useState } from "react";
import styles from "./payments.module.scss";
import { Lock } from "react-bootstrap-icons";
import CustomInput from "@/components/ui/cuatom_input/cuatom_input";
import { Col, Form, Row } from "react-bootstrap";
import CustomButton from "@/components/ui/custom_button/custom_button";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import ConfirmPopup from "@/components/ui/popups/confirm_popup/confirm_popup";
import { useRouter } from "next/router";
import CustomSelect from "@/components/ui/select/custom_select/custom_select";
import { useInitiateRequestPayment } from "@/api_hooks/request_hooks/request.hooks";

const PaymentPortal = ({
  currentUser,
  packageData,
  setShowPaymentFor,
  setCurrentTabIndex,
}) => {
  const { price, name, count, isFree, id: packageId } = packageData;
  const { mutateAsync, isPending } = useInitiateRequestPayment();

  const isLoading = isPending;

  const [showSuccess, setShowSuccess] = useState(false);
  const [skill, setSkill] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const router = useRouter();

  const initiatePurchaseRequest = async () => {
    try {
      const res = await mutateAsync({
        candidateId: currentUser.id,
        packageId: packageId,
        skillId: skill.id,
      });
      router.replace(res.redirectUrl);
    } catch (error) {
      console.log(error);
    }
  };

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
          setTimeout(() => {
            router.reload();
          }, 100);

          router.replace("/candidate");
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
              <h5>Skill</h5>

              <CustomSelect
                options={
                  currentUser.Skills
                    ? currentUser.Skills.map((s) => s.name)
                    : []
                }
                value={skill?.name}
                onChange={(e, v) => {
                  setSkill(currentUser.Skills.find((s) => s.name === v));
                }}
              />
            </div>
            <br />
          </Col>

          <Col xs={12}>
            <div className={styles.info}>
              <h5>Package</h5>

              <h4>Name : {name}</h4>
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
              <Form.Check
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                }}
              />
              <p>Agree to terms and conditions</p>
            </div>
            <br />
          </div>
          <br />
          <hr />
          <br />

          <CustomButton
            onClick={initiatePurchaseRequest}
            isLoading={isLoading}
            disabled={!skill || !agreed}
          >
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

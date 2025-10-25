import React, { useEffect, useRef, useState } from "react";

import styles from "./check_status.module.scss";
import { useCheckPaymentStatusAndSendJob } from "@/api_hooks/request_hooks/request.hooks";

const CheckPaymentStatus = ({
  orderId,
  router,
  setCurrentTabIndex,
  currentUser,
}) => {
  const { mutateAsync, isPending } = useCheckPaymentStatusAndSendJob(
    currentUser?.id
  );

  const [isSuccess, setIsSuccess] = useState(false);

  const [result, setResult] = useState(null);

  const didRun = useRef(false);
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const checkStatus = async () => {
      try {
        const response = await mutateAsync(orderId);

        if (response.success) {
          setIsSuccess(true);
          setCurrentTabIndex(0);
          router.replace("/candidate");
        } else {
          setResult(response);
        }
      } catch (error) {
        console.error("err---->>", error);
      }
    };

    checkStatus();
  }, [orderId, mutateAsync, router]);

  return (
    <div className={styles.CheckPaymentStatus}>
      {isPending && !result && "Please Wait"}
      <br />
      {result && result.state}
    </div>
  );
};

export default CheckPaymentStatus;

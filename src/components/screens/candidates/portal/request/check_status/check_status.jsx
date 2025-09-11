import React, { useEffect, useRef, useState } from "react";

import styles from "./check_status.module.scss";
import { useCheckPaymentStatusAndSendJob } from "@/api_hooks/request_hooks/request.hooks";

const CheckPaymentStatus = ({ orderId, router, setCurrentTabIndex }) => {
  const { mutateAsync, isPending } = useCheckPaymentStatusAndSendJob(orderId);

  const [isSuccess, setIsSuccess] = useState(false);

  const [result, setResult] = useState(null);

  const checkStatus = async () => {
    try {
      const response = await mutateAsync(orderId);

      if (response.success) {
        setIsSuccess(true);

        setCurrentTabIndex(0);
        setTimeout(() => {
          router.reload();
        }, 100);

        router.replace("/candidate");
      } else {
        setResult(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    checkStatus();
  }, []);

  return (
    <div className={styles.CheckPaymentStatus}>
      {isPending && !result && "Please Wait"}
      <br />
      {result && result.state}
    </div>
  );
};

export default CheckPaymentStatus;

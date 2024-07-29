import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomTable from "@/components/ui/custom_table/custom_table";
import CustomTableRow from "@/components/ui/custom_table/custom_table_row/custom_table_row";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import MainFrame from "@/components/ui/main_frame/main_frame";
import { useFetchRequestByUid } from "@/hooks/request_hooks/request_hooks";
import { formatDate } from "@/utils/helpers/helpers";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const AllJobRequests = ({ currentUser, setShowHistory }) => {
  const [requests, setRequests] = useState([]);

  const { mutateAsync, isLoading } = useFetchRequestByUid();

  const fetchJobRequests = async () => {
    try {
      const res = await mutateAsync(currentUser?.id);

      if (res.data) {
        setRequests(res.data || []);
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchJobRequests();
  }, []);

  const getPendingRequests = () => {
    let totalRequests = 0;
    let jobsSent = 0;

    requests.forEach((req) => {
      totalRequests = totalRequests += req.count;
      jobsSent = jobsSent += req.jobs_sent;
    });

    return totalRequests - jobsSent;
  };

  return (
    <MainFrame>
      <CustomButton
        onClick={() => {
          setShowHistory(false);
        }}
      >
        Purchase Requests
      </CustomButton>
      {isLoading && <LoadingScreen noBg />}

      <br />
      <br />

      <h4>{`Pending Requests: ${getPendingRequests()}`}</h4>
      <div>
        <CustomTable
          head={[
            {
              title: "Count",
            },
            {
              title: "Payment Id",
            },
            {
              title: "Requested On",
            },
            {
              title: "Jobs Sent",
            },
          ]}
          title="Requests History"
          count={requests.length}
        >
          {requests.map((r) => {
            return (
              <CustomTableRow key={r.id}>
                <Col>{r.count}</Col>
                <Col>{r.payment_id || "Free"}</Col>
                <Col>{formatDate(r.createdAt)}</Col>
                <Col>{r.jobs_sent}</Col>
              </CustomTableRow>
            );
          })}
        </CustomTable>
      </div>
    </MainFrame>
  );
};

export default AllJobRequests;

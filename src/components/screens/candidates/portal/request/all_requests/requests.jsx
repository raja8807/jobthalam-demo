import { useFetchJobRequests } from "@/api_hooks/request_hooks/request.hooks";
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

  const getPendingRequests = () => {
    let totalRequests = 0;
    let jobsSent = 0;

    requests.forEach((req) => {
      totalRequests = totalRequests += req.count;
      jobsSent = jobsSent += req.jobs_sent;
    });

    return totalRequests - jobsSent;
  };

  const { data, isLoading } = useFetchJobRequests(currentUser?.id);

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

      {data && (
        <div>
          <CustomTable
            head={[
              {
                title: "Skill",
              },
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
            {data?.map((r) => {
              return (
                <CustomTableRow key={r.id}>
                  <Col>
                    <b>{r.skill.name}</b>
                  </Col>
                  <Col>{r.package.count}</Col>
                  <Col>{r.payment_id || "Free"}</Col>
                  <Col>{formatDate(r.createdAt)}</Col>
                  <Col>{r.featuredJobs.length}</Col>
                </CustomTableRow>
              );
            })}
          </CustomTable>
        </div>
      )}
    </MainFrame>
  );
};

export default AllJobRequests;

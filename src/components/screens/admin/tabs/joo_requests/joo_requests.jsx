import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomTable from "@/components/ui/custom_table/custom_table";
import CustomTableRow from "@/components/ui/custom_table/custom_table_row/custom_table_row";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import MainFrame from "@/components/ui/main_frame/main_frame";
import { getAllData, getData } from "@/libs/firebase/firebase";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import RequestDetails from "./request_details/request_details";
import { formatDate } from "@/utils/helpers/helpers";

const JobRequests = ({ allJobs, requests, allAdminJobs }) => {
  const [showDetailsFor, setShowDetailsFor] = useState(null);

  return (
    <MainFrame head="Job Requests">
      <div>
        {showDetailsFor ? (
          <RequestDetails
            request={showDetailsFor}
            setShow={setShowDetailsFor}
            allJobs={allJobs}
            allAdminJobs={allAdminJobs}
          />
        ) : (
          <CustomTable
            head={[
              {
                title: "Count",
              },
              {
                title: "Jobs Sent",
              },
              {
                title: "Requested On",
              },
              {
                title: "Payment Id",
              },
            ]}
            title="Requests History"
            count={requests.length}
          >
            {requests.map((r) => {
              return (
                <CustomTableRow
                  key={r.id}
                  onClick={() => {
                    setShowDetailsFor(r);
                  }}
                >
                  <Col>{r.count}</Col>
                  <Col>{r.jobs_sent}</Col>
                  <Col>{formatDate(r.createdAt)}</Col>
                  <Col>{r.payment_id || "Free"}</Col>
                </CustomTableRow>
              );
            })}
          </CustomTable>
        )}
      </div>
    </MainFrame>
  );
};

export default JobRequests;

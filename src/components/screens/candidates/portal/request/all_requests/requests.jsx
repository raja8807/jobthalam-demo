import CustomTable from "@/components/ui/custom_table/custom_table";
import CustomTableRow from "@/components/ui/custom_table/custom_table_row/custom_table_row";
import React from "react";
import { Col, Row } from "react-bootstrap";

const AllJobRequests = ({ requests }) => {
  return (
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
              <Col>{r.created_at}</Col>
              <Col>{r.jobs_sent}</Col>
            </CustomTableRow>
          );
        })}
      </CustomTable>
    </div>
  );
};

export default AllJobRequests;

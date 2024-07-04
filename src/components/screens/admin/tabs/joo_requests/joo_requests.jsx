import CustomButton from "@/components/ui/custom_button/custom_button";
import CustomTable from "@/components/ui/custom_table/custom_table";
import CustomTableRow from "@/components/ui/custom_table/custom_table_row/custom_table_row";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import MainFrame from "@/components/ui/main_frame/main_frame";
import { getAllData, getData } from "@/libs/firebase/firebase";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import RequestDetails from "./request_details/request_details";

const JobRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [allJobs, setAllJobs] = useState([]);
  const [showDetailsFor, setShowDetailsFor] = useState(null);

  const fetchJobRequests = async () => {
    setIsLoading(true);
    try {
      const res = await getAllData("Request");
      const jobs = await getAllData("Job");
      setRequests(res);
      setAllJobs(jobs);
    } catch (err) {
      console.log("job request error", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchJobRequests();
  }, []);

  return (
    <MainFrame head="Job Requests">
      <div>
        {isLoading && <LoadingScreen />}

        {showDetailsFor ? (
          <RequestDetails
            request={showDetailsFor}
            setShow={setShowDetailsFor}
            setIsLoading={setIsLoading}
            allJobs={allJobs}
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
                  <Col>{r.created_at}</Col>
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

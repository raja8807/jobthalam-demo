import MainFrame from "@/components/ui/main_frame/main_frame";
import { getDataByQuery } from "@/libs/firebase/firebase";
import React, { useEffect, useState } from "react";
import AllJobRequests from "./all_requests/requests";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import { useFetchRequestByUid } from "@/hooks/request_hooks/request_hooks";

const JobRequests = ({ currentUser }) => {
  const [requests, setRequests] = useState([]);

  const { data, mutateAsync, isLoading } = useFetchRequestByUid();

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

  const {} = useFetchRequestByUid;

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
    <MainFrame
      head="Job Requests"
      caption="Here is your history of Job requests and payments"
    >
      {isLoading && <LoadingScreen noBg />}
      <h4>Pending Requests: {getPendingRequests()}</h4>
      <br />

      <AllJobRequests requests={requests} />
    </MainFrame>
  );
};

export default JobRequests;

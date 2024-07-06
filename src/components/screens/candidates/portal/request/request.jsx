import MainFrame from "@/components/ui/main_frame/main_frame";
import { getDataByQuery } from "@/libs/firebase/firebase";
import React, { useEffect, useState } from "react";
import AllJobRequests from "./all_requests/requests";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const JobRequests = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const fetchJobRequests = async () => {
    try {
      setIsLoading(true);
      const res = await getDataByQuery("Request", [
        "candidate_id",
        "==",
        currentUser?.id,
      ]);

      if (res) {
        setRequests(res);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobRequests();
  }, []);

  const getPendingRequests = ()=>{
    let totalRequests = 0
    let jobsSent = 0

    requests.forEach((req)=>{
      totalRequests = totalRequests += req.count
      jobsSent = jobsSent += req.jobs_sent
    })

    return totalRequests - jobsSent
  }

  console.log(requests);

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

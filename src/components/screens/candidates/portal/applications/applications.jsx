import JobCard from "@/components/ui/job/job_card/job_card";
import MainFrame from "@/components/ui/main_frame/main_frame";
import { getDataByQuery } from "@/libs/firebase/firebase";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";

const ApplicationsTab = ({ currentUser }) => {

    const [applications,setAllApplications] = useState([])



  const getApplications = async () => {
    try {
      const applications = await getDataByQuery("Application", [
        "candidate_id",
        "==",
        currentUser?.id,
      ]);

      setAllApplications(applications||{})
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  return <MainFrame head="Applications">
    <Row>
        {
            applications.map((a)=>{
                return <JobCard key={a.id} job={a}/>
            })
        }
    </Row>
  </MainFrame>;
};

export default ApplicationsTab;

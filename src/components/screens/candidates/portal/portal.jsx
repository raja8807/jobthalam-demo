import CustomContainer from "@/components/ui/custom_container/custom_container";
import Tabs from "@/components/ui/tabs/tabs";
import React, { useEffect, useState } from "react";
import {
  Briefcase,
  ClipboardCheck,
  ClipboardPlus,
  PersonCircle,
} from "react-bootstrap-icons";
import Jobs from "./jobs/jobs";
import { useRouter } from "next/router";
import JobRequests from "./request/request";
import { getData, getDataByQuery } from "@/libs/firebase/firebase";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const PortalScreen = ({ currentUser, setCurrentUser }) => {
  const router = useRouter();

  const [allJobs, setAllJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tabIndex = router.query.t;

  const getJobs = async () => {
    setIsLoading(true);
    try {
      const res = await getDataByQuery("Featured", [
        "candidate_id",
        "==",
        currentUser.id,
      ]);
      setAllJobs(res);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getJobs();
  }, []);

  // console.log(allJobs);

  const tabs = [
    {
      id: "1",
      title: "Find Jobs",
      icon: <Briefcase />,
      component: (
        <Jobs
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          allJobs={allJobs}
          isLoading={isLoading}
          setAllJobs={setAllJobs}
        />
      ),
    },

    {
      id: "3",
      title: "Job Requests",
      icon: <ClipboardCheck />,
      component: <JobRequests currentUser={currentUser} />,
    },
    {
      id: "2",
      title: "Profile",
      icon: <PersonCircle />,
    },
  ];

  const [currentTabIndex, setCurrentTabIndex] = useState(tabIndex || 0);

  const currentTab = tabs[currentTabIndex];

  useEffect(() => {
    if (tabIndex == 2) {
      setCurrentTabIndex(tabIndex);
    }
  }, [tabIndex]);

  return (
    <div>
      <CustomContainer>
        {isLoading && <LoadingScreen />}
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          // setCurrentTab={setCurrentTab}
          onTabChange={(tab, i) => {
            setCurrentTabIndex(i);
            router.push(
              {
                pathname: "/candidate",
                query: { t: `${i}` },
              },
              undefined,
              { shallow: true }
            );
          }}
        />
        {currentTab?.component}
      </CustomContainer>
    </div>
  );
};

export default PortalScreen;

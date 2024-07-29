import CustomContainer from "@/components/ui/custom_container/custom_container";
import Tabs from "@/components/ui/tabs/tabs";
import React, { useEffect, useState } from "react";
import {
  Briefcase,
  CheckCircle,
  ClipboardCheck,
  Paperclip,
  PersonCircle,
} from "react-bootstrap-icons";
import Jobs from "./jobs/jobs";
import { useRouter } from "next/router";
import JobRequests from "./request/request";
import { getDataByQuery } from "@/libs/firebase/firebase";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import ApplicationsTab from "./applications/applications";
import { useFetchFeaturedJobsByUid } from "@/hooks/featured_job_hooks/featured_job_hooks";

const PortalScreen = ({ currentUser, setCurrentUser }) => {
  const router = useRouter();

  const [allJobs, setAllJobs] = useState([]);

  const tabIndex = router.query.t;

  const { mutateAsync, isLoading } = useFetchFeaturedJobsByUid();

  const getJobs = async () => {
    try {
      const res = await mutateAsync(currentUser.id);
      setAllJobs(res?.data || []);
    } catch (err) {
      console.log(err);
    }
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
      id: "2",
      title: "Applications",
      icon: <CheckCircle />,
      component: <ApplicationsTab currentUser={currentUser} />,
    },
    {
      id: "3",
      title: "Job Requests",
      icon: <ClipboardCheck />,
      component: <JobRequests currentUser={currentUser} />,
    },
    {
      id: "4",
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

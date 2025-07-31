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
import ProfileTab from "./profile/profile";
import { useFetchFeaturedJobs } from "@/api_hooks/job_hooks/job.hooks";

const PortalScreen = ({ currentUser, setCurrentUser }) => {
  const router = useRouter();

  const tabIndex = router.query.t;

  const [currentTabIndex, setCurrentTabIndex] = useState(tabIndex || 0);

  const { data: featuredJobs, isLoading } = useFetchFeaturedJobs(
    currentUser?.id
  );

  const tabs = [
    {
      id: "1",
      title: "Find Jobs",
      icon: <Briefcase />,
      component: (
        <Jobs
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setCurrentTabIndex={setCurrentTabIndex}
          isLoading={isLoading}
          allJobs={featuredJobs}
        />
      ),
    },

    {
      id: "2",
      title: "Applications",
      icon: <CheckCircle />,
      component: (
        <ApplicationsTab
          currentUser={currentUser}
          appliedJobs={
            featuredJobs ? featuredJobs.filter((f) => !!f.application) : []
          }
        />
      ),
    },
    {
      id: "3",
      title: "Job Requests",
      icon: <ClipboardCheck />,
      component: (
        <JobRequests
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setCurrentTabIndex={setCurrentTabIndex}
        />
      ),
    },
    {
      id: "4",
      title: "Profile",
      icon: <PersonCircle />,
      component: (
        <ProfileTab currentUser={currentUser} setCurrentUser={setCurrentUser} />
      ),
    },
  ];

  const currentTab = tabs[currentTabIndex];

  useEffect(() => {
    if (tabIndex) {
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

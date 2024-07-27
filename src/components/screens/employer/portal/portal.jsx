import CustomContainer from "@/components/ui/custom_container/custom_container";
import Tabs from "@/components/ui/tabs/tabs";
import React, { useEffect, useState } from "react";
import { Briefcase, PersonBadge, PersonCircle } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import ManageJobs from "./tabs/manage_jobs/manage_jobs";
import { getDataByQuery } from "@/libs/firebase/firebase";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";
import Applications from "./tabs/applications/applications";
import { useFetchJobByUid } from "@/hooks/job_hooks/job_hooks";

const PortalScreen = ({ currentUser, setCurrentUser }) => {
  const router = useRouter();
  const tabIndex = router.query.t;

  const [allJobs, setAllJobs] = useState([]);
  const [applications, setApplications] = useState(null);

  let tabs = [
    {
      id: "2",
      title: "Manage Jobs",
      icon: <Briefcase />,
      component: (
        <ManageJobs
          currentUser={currentUser}
          allJobs={allJobs}
          setAllJobs={setAllJobs}
        />
      ),
    },
    {
      id: "1",
      title: "Applications",
      icon: <PersonBadge />,
      component: (
        <Applications
          currentUser={currentUser}
          applications={applications}
          setApplications={setApplications}
        />
      ),
    },

    {
      id: "3",
      title: "Profile",
      icon: <PersonCircle />,
    },
  ];

  const { mutateAsync, isLoading } = useFetchJobByUid();

  const fetchAllJobs = async () => {
    try {
      const res = await mutateAsync(currentUser.id);
      setAllJobs(res?.data || []);
      tabs = tabs;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const [currentTabIndex, setCurrentTabIndex] = useState(tabIndex || 0);

  const currentTab = tabs[currentTabIndex];

  useEffect(() => {
    if (tabIndex == 2) {
      setCurrentTabIndex(tabs[tabIndex]);
    }
  }, [tabIndex]);

  return (
    <div>
      {isLoading && <LoadingScreen />}
      <CustomContainer>
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          onTabChange={(tab, i) => {
            setCurrentTabIndex(i);
            router.push(
              {
                pathname: "/employer",
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

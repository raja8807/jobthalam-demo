import CustomContainer from "@/components/ui/custom_container/custom_container";
import Tabs from "@/components/ui/tabs/tabs";
import React, { useEffect, useState } from "react";
import { Briefcase, PersonBadge, PersonCircle } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import ManageJobs from "./tabs/manage_jobs/manage_jobs";
import { getDataByQuery } from "@/libs/firebase/firebase";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const PortalScreen = ({ currentUser, setCurrentUser }) => {
  const router = useRouter();
  const tabIndex = router.query.t;

  const [allJobs, setAllJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    },

    {
      id: "3",
      title: "Profile",
      icon: <PersonCircle />,
    },
  ];

  const fetchAllJobs = async () => {
    setIsLoading(true);
    try {
      const res = await getDataByQuery("Job", [
        "employer_id",
        "==",
        currentUser.id,
      ]);
      setAllJobs(res);
      tabs = tabs;
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const [currentTabIndex, setCurrentTabIndex] = useState(tabIndex || 0);

  const currentTab = tabs[currentTabIndex];

  useEffect(() => {
    if (tabIndex == 2) {
      setCurrentTab(tabs[tabIndex]);
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

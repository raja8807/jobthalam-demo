import CustomContainer from "@/components/ui/custom_container/custom_container";
import MainFrame from "@/components/ui/main_frame/main_frame";
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

const PortalScreen = ({ currentUser, setCurrentUser }) => {
  const router = useRouter();

  const tabIndex = router.query.t;

  const tabs = [
    {
      id: "1",
      title: "Find Jobs",
      icon: <Briefcase />,
      component: (
        <Jobs currentUser={currentUser} setCurrentUser={setCurrentUser} />
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

  const [currentTab, setCurrentTab] = useState(tabs[tabIndex || 0]);

  useEffect(() => {
    if (tabIndex == 2) {
      setCurrentTab(tabs[tabIndex]);
    }
  }, [tabIndex]);

  return (
    <div>
      <CustomContainer>
        <Tabs
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onTabChange={(tab, i) => {
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

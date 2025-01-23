import React, { useState } from "react";
import AdminJobsForm from "../components/admin_job_form/admin_job_form";
import CustomTabs from "../../../../../ui/tabs/tabs";

const AddAdminJobsScreen = () => {
  const tabs = [
    {
      title: "Single Job",
      component: <AdminJobsForm />,
    },
    {
      title: "Multiple Jobs",
      component: <p>multi</p>,
    },
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div>
      <CustomTabs
        tabs={tabs}
        stayTop
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div>{currentTab?.component}</div>
    </div>
  );
};

export default AddAdminJobsScreen;

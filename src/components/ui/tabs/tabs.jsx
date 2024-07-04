import React from "react";
import Tab from "./tab/tab";
import styles from "./tabs.module.scss";

const Tabs = ({ tabs = [], currentTab, setCurrentTab=()=>{},onTabChange=()=>{} }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab,index) => {
        return (
          <Tab
            key={tab.title}
            tab={tab}
            setCurrentTab={setCurrentTab}
            index={index}
            isActive={currentTab?.title === tab?.title}
            onTabChange={onTabChange}
          />
        );
      })}
    </div>
  );
};

export default Tabs;

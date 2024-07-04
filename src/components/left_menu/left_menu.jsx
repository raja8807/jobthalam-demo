import React, { useEffect, useState } from "react";
import styles from "./left_menu.module.scss";
import { ChevronLeft, List, Power } from "react-bootstrap-icons";

const LeftMenu = ({
  menuItems = [],
  currentMenuItem,
  setCurrentMenuItemIndex = () => {},
  head = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 720) {
      setIsExpanded(false);
    }
  }, []);

  return (
    <div
      className={`${styles.LeftMenu} ${
        isExpanded ? styles.expanded : styles.shrink
      }`}
    >
      <div>
        <div className={styles.head}>
          {isExpanded && <p>{head.toUpperCase()}</p>}
          {isExpanded ? (
            <ChevronLeft
              onClick={() => {
                setIsExpanded(false);
              }}
              className={styles.chevron}
            />
          ) : (
            <List
              onClick={() => {
                setIsExpanded(true);
              }}
              className={styles.list}
            />
          )}
        </div>
        <div className={styles.wrap}>
          <div>
            {menuItems.map((item, idx) => {
              return (
                <div
                  className={`${styles.item} ${
                    currentMenuItem?.id === item?.id ? styles.active : ""
                  }`}
                  key={item.id || item.title}
                  onClick={() => {
                    setCurrentMenuItemIndex(idx);
                  }}
                >
                  <span>{item.icon}</span>
                  {isExpanded && item.title}
                </div>
              );
            })}
          </div>

          <div className={`${styles.item} ${styles.logout}`}>
            <span>
              <Power />
            </span>
            {isExpanded && "Logout"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;

import React from "react";
import styles from "./admin_header.module.scss";

const AdminHeader = ({ router, menuItems }) => {
  const getTitle = () => {
    let title = "";

    if (router.pathname === "/admin") {
      title = "Dashboard";
    } else {
      const menu = menuItems.find((m) =>
        router.pathname.includes(`/admin/${m.href}`)
      );
      if (menu) {
        title += menu.title;

        const subMenu =
          menu.subMenus &&
          menu.subMenus.find((sm) => {
            return router.pathname === `/admin/${menu.href}/${sm.href}`;
          });
        if (subMenu) {
          title += ` / ${subMenu.title}`;
        }
      }
    }

    return title;
  };

  return (
    <div className={styles.AdminHeader}>
      <p className={styles.title}>{getTitle()}</p>
    </div>
  );
};

export default AdminHeader;

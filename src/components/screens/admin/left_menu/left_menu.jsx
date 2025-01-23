import React, { useEffect, useState } from "react";
import styles from "./left_menu.module.scss";
import { Image } from "react-bootstrap";
import {
  ChevronDown,
  ChevronRight,
} from "react-bootstrap-icons";
import Link from "next/link";

const MenuItem = ({ expanded, setExpanded, menuItem, router }) => {
  const [isOpened, setIsOpened] = useState(false);

  const getIsActive = () => {
    if (menuItem.isMainPage) {
      return router.pathname === "/admin";
    }

    return menuItem.subMenus.some((sm) => {
      return router.pathname == `/admin/${menuItem.href}/${sm.href}`;
    });
  };

  const isActive = getIsActive();

  useEffect(() => {
    setIsOpened(isActive);
  }, [isActive]);

  return (
    <div className={`${styles.MenuItem}`}>
      <div
        className={`${styles.title} ${isActive ? styles.activeTitle : ""}`}
        onClick={() => {
          if (!expanded) {
            setExpanded(true);
          } else {
            if (menuItem.isMainPage) {
              router.push("/admin");
            } else {
              setIsOpened((prev) => !prev);
            }
          }
        }}
      >
        <div>
          {menuItem.icon}
          {expanded && <p>{menuItem.title}</p>}
        </div>
        {expanded &&
          menuItem?.subMenus?.[0] &&
          (isOpened ? <ChevronDown /> : <ChevronRight />)}
      </div>
      {menuItem?.subMenus?.[0] && isOpened && expanded && (
        <div className={styles.subMenu}>
          {menuItem?.subMenus.map((sm) => {
            return (
              <Link
                key={sm.title}
                href={`/admin/${menuItem.href}/${sm.href}`}
                className={
                  router.pathname == `/admin/${menuItem.href}/${sm.href}`
                    ? styles.active
                    : ""
                }
              >
                {sm.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const LeftMenu = ({ expanded, setExpanded, router, menuItems }) => {
  return (
    <aside className={styles.LeftMenu}>
      <div className={styles.logo}>
        {expanded && <Image src="/logo/logo_f_v.jpg" fluid alt="logo" />}
      </div>

      <div className={styles.menu}>
        {menuItems.map((item) => {
          return (
            <MenuItem
              key={item.title}
              expanded={expanded}
              setExpanded={setExpanded}
              menuItem={item}
              router={router}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default LeftMenu;

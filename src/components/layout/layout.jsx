import React, { useState } from "react";
import LeftMenu from "../screens/admin/left_menu/left_menu";
import styles from "./layout.module.scss";
import Header from "./header/header";
import { useRouter } from "next/router";
import AdminHeader from "./header/admin_header/admin_header";
import {
  Briefcase,
  Buildings,
  Grid,
  ListColumnsReverse,
  People,
} from "react-bootstrap-icons";

const Layout = ({ children, currentUser, session }) => {
  const router = useRouter();

  const isIsAdminPanel = router?.asPath && router.asPath.includes("/admin");
  const [expanded, setExpanded] = useState(true);

  const menuItems = [
    {
      title: "Dashboard",
      isMainPage: true,
      icon: <Grid />,
    },
    {
      title: "Admin Jobs",
      href: "admin_job",
      icon: <Briefcase />,
      subMenus: [
        {
          title: "Manage Jobs",
          href: "manage",
        },
        {
          title: "Add Job",
          href: "add",
        },
      ],
    },
    {
      title: "Skills",
      href: "skills",
      icon: <ListColumnsReverse />,
      subMenus: [
        {
          title: "Manage Industries",
          href: "manage_industries",
        },
        {
          title: "Add Industry",
          href: "add_industry",
        },
        {
          title: "Manage Skills",
          href: "manage_skills",
        },
        {
          title: "Add Skill",
          href: "add_skill",
        },
      ],
    },
    {
      title: "Employers",
      href: "employer",
      icon: <Buildings />,
      subMenus: [
        {
          title: "Manage Employers",
          href: "employers",
        },
        {
          title: "Manage Jobs",
          href: "manage_jobs",
        },
        {
          title: "Add Job",
          href: "add_job",
        },
      ],
    },
    {
      title: "Candidates",
      href: "candidate",
      icon: <People />,
      subMenus: [
        {
          title: "Manage Candidates",
          href: "candidates",
        },
        {
          title: "Manage Requests",
          href: "requests",
        },
      ],
    },
    {
      title: "Landing page",
      href: "landing",
      icon: <People />,
      subMenus: [
        {
          title: "Candidate Landing ",
          href: "candidate",
        },
        {
          title: "Employer Landing",
          href: "employer",
        },
      ],
    },
  ];

  return (
    <div className={styles.Layout}>
      {isIsAdminPanel && (
        <LeftMenu
          expanded={expanded}
          setExpanded={setExpanded}
          router={router}
          menuItems={menuItems}
        />
      )}
      <div className={styles.right}>
        <Header
          currentUser={currentUser}
          session={session}
          isIsAdminPanel={isIsAdminPanel}
          setExpanded={setExpanded}
        />
        {isIsAdminPanel ? (
          <div className={styles.panel}>
            <AdminHeader router={router} menuItems={menuItems} />
            <div className={styles.cont}>{children}</div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Layout;

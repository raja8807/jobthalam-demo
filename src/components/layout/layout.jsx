import React from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import { useRouter } from "next/router";

const Layout = ({
  children,
  currentUser,
  session,
  showLogin,
  setShowLogin,
}) => {
  const router = useRouter();

  return (
    <div>
      <Header
        currentUser={currentUser}
        session={session}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
      />
      {children}
      {!router.pathname.includes("candidate") && (
        <Footer session={session} setShowLogin={setShowLogin} />
      )}
    </div>
  );
};

export default Layout;

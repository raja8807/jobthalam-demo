import React from "react";
import Header from "./header/header";
import Footer from "./footer/footer";

const Layout = ({
  children,
  currentUser,
  session,
  showLogin,
  setShowLogin,
}) => {
  return (
    <div>
      <Header
        currentUser={currentUser}
        session={session}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
      />
      {children}
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;

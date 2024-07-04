import React from "react";
import Header from "./header/header";
import Footer from "./footer/footer";

const Layout = ({ children, currentUser, session }) => {
  return (
    <div>
      <Header currentUser={currentUser} session={session} />
      {children}
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;

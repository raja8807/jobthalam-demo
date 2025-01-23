import styles from "./header.module.scss";
import TopHeader from "./top_header/top_header";

const Header = ({ currentUser, session, isIsAdminPanel,setExpanded }) => {
  return (
    <header className={`${styles.header} `}>
      <TopHeader
        session={session}
        currentUser={currentUser}
        isIsAdminPanel={isIsAdminPanel}
        setExpanded={setExpanded}
      />
    </header>
    // Jobthalam@#$%1
  );
};

export default Header;

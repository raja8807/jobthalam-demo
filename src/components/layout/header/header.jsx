import styles from "./header.module.scss";
import MainHeader from "./main_header/main_header";
// import SubHeader from "./sub_header/sub_header";
import TopHeader from "./top_header/top_header";

const Header = ({ currentUser, session }) => {
  return (
    <header className={`${styles.header} `}>
      <TopHeader session={session} />

      <MainHeader currentUser={currentUser} session={session} />
      {/* <SubHeader /> */}
    </header>
    // Jobthalam@#$%1
  );
};

export default Header;

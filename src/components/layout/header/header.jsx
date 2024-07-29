import CustomButton from "@/components/ui/custom_button/custom_button";
import styles from "./header.module.scss";
import MainHeader from "./main_header/main_header";
// import SubHeader from "./sub_header/sub_header";
import TopHeader from "./top_header/top_header";
import axios from "axios";

const Header = ({ currentUser, session }) => {
  return (
    <header className={`${styles.header} `}>
      <TopHeader session={session} />
      <CustomButton
        onClick={async () => {
          try {
            const res = await axios.get("/api/test");
          } catch (er) {
            console.log(er);
          }
        }}
      >
        Test
      </CustomButton>
      <MainHeader currentUser={currentUser} session={session} />
      {/* <SubHeader /> */}
    </header>
    // Jobthalam@#$%1
  );
};

export default Header;

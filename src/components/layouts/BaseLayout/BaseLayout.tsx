import { Outlet } from "react-router-dom";
import styles from "./BaseLayout.module.scss";
import { Navbar } from "../../shared/Navbar/Navbar";
// import { Navbar } from "components/shared/Navbar/Navbar";

const BaseLayout = () => {
  return (
    <div className={styles["base-layout"]}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default BaseLayout;

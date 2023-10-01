import React from "react";
import styles from "./ToggleUser.module.scss";
import { Icon } from "@shared";

const ToggleUser = () => {
  return (
    <div className={styles["toggle-user"]}>
      <Icon icon={"arrow-left"} size={22} color="white" />
      <div className={styles["toggle-user__names"]}>
        <p className={styles["toggle-user__name"]}>Mario Rossi</p>
        <p className={styles["toggle-user__out"]}>Esci</p>
      </div>
    </div>
  );
};

export default ToggleUser;

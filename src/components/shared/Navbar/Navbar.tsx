//components
import { Tag } from "antd";

// styles

import styles from "./Navbar.module.scss";
import { FC } from "react";
import { Icon } from "../Icon/Icon";
import { Button } from "../Form/Button/Button";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <header className={styles["navbar"]}>
      <nav>
        <div className={styles["navbar__container-icon-btn"]}>
          <Icon icon="logo-pratico" size={40} color="white" />

          {false ? (
            <p className={styles["navbar-container__n"]}>N° pratica: 1234567</p>
          ) : null}
          {false ? (
            <Button
              text={"La tua certificazione"}
              bgColor="#F5B825"
              textColor="#3E1160"
              icon={{ position: "left", name: "list-check" }}
              className={styles["navbar-container__certification"]}
            />
          ) : null}
        </div>
        <div className={styles["navbar-container__container-help-user"]}>
          <Tag className={styles["navbar-container__tag"]}>
            <Icon icon={"help"} /> Aiuto
          </Tag>
          {/* {false ? <ToggleUser /> : <Icon icon={"arrow-left"} color="white" />} */}
        </div>
      </nav>
    </header>
  );
};

export { Navbar };

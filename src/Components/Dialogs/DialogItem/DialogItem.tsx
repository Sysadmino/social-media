import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./dialog-item.module.scss";

interface IDialogItemProps {
  id: number;
  name: string;
}

const DialogItem: React.FC<IDialogItemProps> = (props) => {
  return (
    <div>
      <NavLink
        activeClassName={styles.active}
        className={styles.dialog}
        to={`/dialogs/${props.id}`}
      >
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;

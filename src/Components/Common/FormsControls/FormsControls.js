import React from "react";
import styles from "./forms-control.module.scss";
import getClassName from "../../../Services/Service";

const FormControl = ({ error, helperText, formControlClassName, children }) => {
  return (
    <div className={getClassName(styles["form-control"], formControlClassName)}>
      <div className={error && styles.error}>{children}</div>
      {error && <span className={styles["error-text"]}>{helperText}</span>}
    </div>
  );
};

export const Textarea = (props) => {
  return (
    <FormControl {...props}>
      <textarea
        type={props.type}
        {...props.name}
        placeholder={props.placeholder}
      />
    </FormControl>
  );
};

export const Input = (props) => {
  const { type, name, placeholder, className } = props;
  return (
    <FormControl {...props}>
      <input
        type={type}
        {...name}
        placeholder={placeholder}
        className={className}
      />
    </FormControl>
  );
};

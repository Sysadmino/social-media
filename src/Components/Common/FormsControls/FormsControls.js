import React from "react";
import styles from "./forms-control.module.scss";

// interface IFormControlProps {
//   error?: boolean;
//   helperText?: string;
//   children: React.ReactNode;
// }

// : React.FunctionComponent<IFormControlProps>

const FormControl = ({ error, helperText, children }) => {
  return (
    <div className={styles["form-control"]}>
      <div className={error && styles.error}>{children}</div>
      {error && <span className={styles["error-text"]}>{helperText}</span>}
    </div>
  );
};

// interface ITextareaProps {
//   type: string;
//   name: any;
//   placeholder?: string;
//   id?: string;
//   helperText?: string;
//   error?: boolean;
// }

//: React.FC<ITextareaProps>

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

// interface IInputProps {
//   type: string;
//   name: any;
//   placeholder?: string;
//   id?: string;
//   helperText?: string;
//   error?: boolean;
// }

// : React.FC<IInputProps>

export const Input = (props) => {
  const { type, name, placeholder } = props;
  return (
    <FormControl {...props}>
      <input type={type} {...name} placeholder={placeholder} />
    </FormControl>
  );
};

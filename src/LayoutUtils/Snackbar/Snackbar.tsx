import React, { FunctionComponent } from "react";
import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";
import getClassName from "../../Services/Service";
import { getVisible, getMessage } from "../../Redux/selectors";
import { clear, hide } from "../../Utils/snackbar-saga";

const Snackbar: FunctionComponent = () => {
  const visible = useSelector(getVisible);
  const object = useSelector(getMessage);
  const { message, variant } = object || {};
  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames="snackbar"
      unmountOnExit
      onExited={clear}
    >
      <div className="snackbar-body-wrapper">
        <div
          className={getClassName(
            "snackbar-body",
            variant === "SUCCESS" && "_success",
            variant === "ERROR" && "_error"
          )}
        >
          <button type="button" onClick={hide} className="snackbar-button">
            <div style={{ color: "white" }}>{message}</div>
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default React.memo(Snackbar);

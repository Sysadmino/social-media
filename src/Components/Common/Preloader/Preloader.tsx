import React from "react";
import { ReactSVG } from "react-svg";
import getClassName from "../../../Services/Service";
import oval from "../../../Assets/Images/oval.svg";
/*
 *
 *  props:
 *  inBlock - Сделает прелоадер спозиционированным по центру внутри любого блока
 *            с CSS свойстом position:relative;
 *
 * */
const Preloader: React.FunctionComponent<{
  inBlock?: boolean | "absolute";
  transparent?: boolean;
  disableSpinner?: boolean;
  inButton?: boolean;
  spinnerIconClassName?: string;
  style?: React.CSSProperties;
}> = (props) => (
  <div
    className={getClassName(
      props.inBlock ? "in-block-preloader" : "full-screen-preloader",
      props.inBlock === "absolute" && "absolute-preloader",
      props.transparent && "transparent-preloader"
    )}
    style={props.style}
  >
    {!props.disableSpinner && (
      <div
        className={getClassName(
          "lds-spinner",
          props.inButton && "_lds-small-spinner"
        )}
      >
        <ReactSVG
          src={oval}
          className={getClassName(
            "lds-inner-spinner",
            props.spinnerIconClassName
          )}
        />
      </div>
    )}
  </div>
);
export default Preloader;

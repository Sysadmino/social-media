import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getCurrentPage,
  getPageSize,
  getPortionSize,
  getTotalUsersCount,
} from "../../../Redux/selectors";
import getClassName from "../../../Services/Service";
import arrow from "../../../Assets/Images/arrow.svg";
import styles from "./pagination.module.scss";

type PropsType = {
  onPageChanged: (pageNumber: number) => void;
};

const Pagination: React.FC<PropsType> = (props) => {
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const totalItemsCount = useSelector(getTotalUsersCount);
  const portionSize = useSelector(getPortionSize);
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div
      className={getClassName(
        "flex _align-items-center",
        styles["bottom-space"]
      )}
    >
      {portionNumber > 1 && (
        <button
          className={styles["previous-botton"]}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          <img src={arrow} className={styles["image"]} alt="" />
        </button>
      )}
      {pages
        .filter(
          (x) => x >= leftPortionPageNumber && x <= rightPortionPageNumber
        )
        .map((x) => {
          return (
            <span
              onClick={() => props.onPageChanged(x)}
              className={getClassName(
                styles["page-number"],
                currentPage === x && styles["selected-page"]
              )}
            >
              {x}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          className={styles["next-botton"]}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          <img src={arrow} className={styles["image"]} alt="" />
        </button>
      )}
    </div>
  );
};

export default Pagination;

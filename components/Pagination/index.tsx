import classNames from "classnames";
import React from "react";

import ss from "./Pagination.module.scss";

type PaginationProps = {};

export const Pagination: React.FC<PaginationProps> = () => {
  return (
    <div className={ss.pagination}>
      <div className={ss.list}>
        <a href="#" className={classNames(ss.item, ss.arrow)}>
          <svg width="20" height="20">
            <use xlinkHref="./static/img/icons/icons.svg#prev" />
          </svg>
        </a>
        <a href="#" className={ss.item}>
          1
        </a>
        <a
          href="#"
          className={classNames(ss.item, {
            [ss.active]: true,
          })}
        >
          2
        </a>
        <a href="#" className={ss.item}>
          3
        </a>
        <a
          href="#"
          className={classNames(ss.item, {
            [ss.disabled]: true,
          })}
        >
          ...
        </a>
        <a href="#" className={ss.item}>
          11
        </a>
        <a href="#" className={classNames(ss.item, ss.arrow)}>
          <svg width="20" height="20">
            <use xlinkHref="./static/img/icons/icons.svg#next" />
          </svg>
        </a>
      </div>

      <div className={ss.skip}>
        <div className={`${ss.input} input`}>
          <input type={ss.number} value="2" />
        </div>
        <button className="btn">Go</button>
      </div>
    </div>
  );
};

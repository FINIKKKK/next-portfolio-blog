import React from "react";

import ss from "./NotFound.module.scss";

type NotFoundProps = {};

export const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <div className="notFound">
      <svg width="20" height="20" className="img">
        <use xlinkHref="./static/img/icons/icons.svg#404" />
      </svg>
      <p className="text">К сожалению, по вашему запросу ничего не нашлось</p>
    </div>
  );
};

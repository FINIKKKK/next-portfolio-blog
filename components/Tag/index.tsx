import React from "react";
import { object } from "yup";
import { TTag } from "../../utils/api/types";

import ss from "./Tag.module.scss";

type TagProps = {
  text: string;
  removeTag: (text: string) => void;
};

export const Tag: React.FC<TagProps> = ({ text, removeTag }) => {
  const onRemove = () => {
    removeTag(text)
  };

  return (
    <div className="item">
      <p>{text}</p>
      <svg onClick={onRemove} width="20" height="20">
        <use xlinkHref="./static/img/icons/icons.svg#close" />
      </svg>
    </div>
  );
};

import React from "react";
import { TComment } from "../../utils/api/types";

import ss from "./Comment.module.scss";

type CommentProps = {};

export const Comment: React.FC<TComment> = ({
  text,
  createdAt: date,
  user,
}) => {
  const newDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="comment @@class">
      <div className="inner">
        <div className="left">
          <img
            src="../../static/img/avatar.png"
            alt="avatar"
            className="avatar"
          />
        </div>
        <div className="content">
          <div className="info">
            <div className="name">{user.name}</div>
            <div className="date">{newDate}</div>
          </div>
          <div className="message">
            <p className="text">{text}</p>
            {/* <div className="comment__footer">
              <button className="more message__btn">Подробнее</button>
              <button className="answer message__btn">Ответить</button>
            </div> */}
            {/* <div className="input">
              <textarea placeholder="Введите комментарий:"></textarea>
              <svg width="20" height="20">
                <use xlinkHref="../../static/img/icons/icons.svg#submit" />
              </svg>
            </div> */}
            {/* <div className="show active">
              <svg width="20" height="20">
                <use xlinkHref="../../static/img/icons/icons.svg#triangle" />
              </svg>
              <p>Ответы</p>
            </div> */}
          </div>
        </div>
      </div>
      {/* <div className="answerList">
        @@include('./commentAnswer.html') @@include('./commentAnswer.html')
      </div> */}
    </div>
  );
};

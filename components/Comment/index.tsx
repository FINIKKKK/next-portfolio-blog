import Link from "next/link";
import React from "react";
import { useSelectors } from "../../hooks/useSelectors";
import { Api } from "../../utils/api";
import { TComment, TPost, TUser } from "../../utils/api/types";
import { Answer } from "./Answer";

import ss from "./Comment.module.scss";

type CommentProps = {
  id: number;
  text: string;
  createdAt: string;
  user: TUser;
  post: TPost;
  removeComment: (id: number) => void;
  children?: TComment[];
  parentName?: string;
  removeAnswer?: (id: number) => void;
};

export const Comment: React.FC<CommentProps> = ({
  id,
  text,
  createdAt: date,
  user,
  children,
  post,
  removeComment,
  parentName,
}) => {
  const newDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const [isVisible, setIsVisible] = React.useState(false);
  const refPopup = React.useRef<HTMLDivElement>(null);
  const { data: userData } = useSelectors((state) => state.user);
  const [visibleInput, setVisibleInput] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(text);
  const [isLoading, setIsLoading] = React.useState(false);
  const [commentText, setCommentText] = React.useState(text);
  const refMessage = React.useRef<HTMLParagraphElement>(null);
  const [fullMessage, setFullMessage] = React.useState(false);
  const [showAnswers, setShowAnswers] = React.useState(false);
  const [showAnswerInput, setShowAnswerInput] = React.useState(false);
  const [answerInputValue, setAnswerInputValue] = React.useState("");
  const [answers, setAnswers] = React.useState<TComment[]>(children || []);
  const refAnswerInput = React.useRef<HTMLTextAreaElement>(null);
  const refAnswerButton = React.useRef<HTMLButtonElement>(null);
  const refUpdateTextarea = React.useRef<HTMLTextAreaElement>(null);
  const refUpdateButtonClose = React.useRef<HTMLButtonElement>(null);
  const [messageMore, setMessageMore] = React.useState(
    refMessage?.current && refMessage?.current?.offsetHeight > 80
  );

  const handleClickOutSide = (e: MouseEvent) => {
    const _event = e as MouseEvent & {
      path: Node[];
    };
    if (refPopup.current && !_event.path.includes(refPopup.current)) {
      setIsVisible(false);
    }
    if (
      refAnswerInput.current &&
      !_event.path.includes(refAnswerInput.current) &&
      refAnswerButton.current &&
      !_event.path.includes(refAnswerButton.current)
    ) {
      setShowAnswerInput(false);
      setAnswerInputValue("");
    }
    if (
      refUpdateTextarea.current &&
      !_event.path.includes(refUpdateTextarea.current) &&
      refPopup.current &&
      !_event.path.includes(refPopup.current) &&
      refUpdateButtonClose.current &&
      !_event.path.includes(refUpdateButtonClose.current)
    ) {
      setVisibleInput(false);
      setInputValue(text);
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const openInput = () => {
    setVisibleInput(true);
    setIsVisible(false);
  };
  const closeAnswerInput = () => {
    setShowAnswerInput(!showAnswerInput);
    setAnswerInputValue("");
  };
  const closeUpdateInput = () => {
    setVisibleInput(!visibleInput);
    setInputValue(text);
  };

  React.useEffect(() => {
    setMessageMore(
      refMessage?.current && refMessage?.current?.offsetHeight > 80
    );
  }, [visibleInput]);

  const removeAnswer = (id: number) => {
    setAnswers((prev) => prev.filter((obj) => obj.id !== id));
  };
  const addAnswer = (comment: TComment) => {
    setAnswers((prev) => [comment, ...prev]);
  };

  const onRemove = async () => {
    if (window.confirm("Вы действительно хотите удалить комментарий?")) {
      try {
        await Api().comment.remove(id);
        if (!parentName) {
          removeComment(id);
        } else {
          removeAnswer(id);
        }
      } catch (err) {
        console.warn(err);
        alert("Ошибка при удалении комментария");
      } finally {
        setIsVisible(false);
      }
    } else {
      setIsVisible(false);
    }
  };

  const onUpdate = async () => {
    try {
      setIsLoading(true);
      const obj = {
        text: inputValue,
      };
      await Api().comment.update(id, obj);
      setVisibleInput(false);
      setCommentText(inputValue);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при редактировании комментария");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const obj = {
        text: answerInputValue,
        postId: post.id,
        parentId: id,
        parentUserId: user.id,
      };
      const comment = await Api().comment.create(obj);
      setShowAnswerInput(false);
      setAnswerInputValue("");
      setAnswers((prev) => [comment, ...prev]);
      setShowAnswers(true);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании комментария");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (refAnswerInput.current) {
      refAnswerInput.current.style.height = "auto";
      refAnswerInput.current.style.height =
        refAnswerInput.current.scrollHeight + 3 + "px";
    }
  }, [answerInputValue, showAnswerInput]);
  React.useEffect(() => {
    if (refUpdateTextarea.current) {
      refUpdateTextarea.current.style.height = "auto";
      refUpdateTextarea.current.style.height =
        refUpdateTextarea.current.scrollHeight + 3 + "px";
    }
  }, [inputValue, visibleInput]);

  return (
    <div className="comment">
      <div className="inner">
        {userData?.user?.data && userData?.user?.data.id === user.id && (
          <div ref={refPopup} className="popupBox">
            <svg
              onClick={() => setIsVisible(!isVisible)}
              className="options"
              width="20"
              height="5"
              viewBox="0 0 20 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.18171 4.36342C3.38508 4.36342 4.36342 3.3849 4.36342 2.18171C4.36342 0.978342 3.38508 0 2.18171 0C0.978343 0 0 0.978342 0 2.18171C0 3.38508 0.978343 4.36342 2.18171 4.36342ZM2.18171 1.32231C2.65509 1.32231 3.04112 1.70732 3.04112 2.18171C3.04112 2.6561 2.6561 3.04112 2.18171 3.04112C1.70834 3.04112 1.32231 2.6561 1.32231 2.18171C1.32231 1.70732 1.70835 1.32231 2.18171 1.32231Z"
                fill="#EAE7F4"
              />
              <path
                d="M10.0001 4.36342C11.2034 4.36342 12.1818 3.3849 12.1818 2.18171C12.1818 0.978342 11.2034 0 10.0001 0C8.7967 0 7.81836 0.978518 7.81836 2.18171C7.81836 3.38508 8.7967 4.36342 10.0001 4.36342ZM10.0001 1.32231C10.4734 1.32231 10.8595 1.70732 10.8595 2.18171C10.8595 2.6561 10.4734 3.04112 10.0001 3.04112C9.52671 3.04112 9.14067 2.65507 9.14067 2.18171C9.14067 1.70835 9.52671 1.32231 10.0001 1.32231Z"
                fill="#EAE7F4"
              />
              <path
                d="M17.8184 0.000244141C16.6151 0.000244141 15.6367 0.978763 15.6367 2.18196C15.6367 3.38532 16.6152 4.36367 17.8184 4.36367C19.0218 4.36367 20.0001 3.38515 20.0001 2.18196C20.0001 0.978587 19.0218 0.000244141 17.8184 0.000244141ZM17.8184 3.04136C17.3451 3.04136 16.959 2.65634 16.959 2.18196C16.959 1.70757 17.344 1.32255 17.8184 1.32255C18.2928 1.32255 18.6778 1.70757 18.6778 2.18196C18.6778 2.65634 18.2918 3.04136 17.8184 3.04136Z"
                fill="#EAE7F4"
              />
            </svg>
            {isVisible && (
              <div className="popup">
                <div onClick={openInput} className="item">
                  Редактировать
                </div>
                <div onClick={onRemove} className="item">
                  Удалить
                </div>
              </div>
            )}
          </div>
        )}
        <div className="left">
          <Link href={`/profile/${user.id}`}>
            <img
              src="../../static/img/avatar.png"
              alt="avatar"
              className="avatar"
            />
          </Link>
        </div>
        <div className="content">
          <div className="info">
            <div className="name">
              <Link href={`/profile/${user.id}`}>{user.name}</Link>
            </div>
            <div className="date">{newDate}</div>
          </div>
          <div className="message">
            {!visibleInput && (
              <p
                ref={refMessage}
                className={`text ${!fullMessage ? "hide" : ""}`}
              >
                {parentName && <span>@{parentName} </span>}
                {commentText}
              </p>
            )}
            {visibleInput && (
              <div className="input">
                <textarea
                  ref={refUpdateTextarea}
                  value={inputValue}
                  onChange={(e: any) => setInputValue(e.target.value)}
                  maxLength={350}
                  rows={1}
                ></textarea>
                {inputValue.length === 350 && (
                  <p className="mark">
                    Максимальная размер сообщения 350 символов
                  </p>
                )}
                {inputValue.length > 0 && (
                  <svg
                    onClick={onUpdate}
                    className={isLoading ? "disabled" : ""}
                    width="20"
                    height="20"
                  >
                    <use xlinkHref="../../static/img/icons/icons.svg#submit" />
                  </svg>
                )}
              </div>
            )}
            <div className="comment__footer">
              {visibleInput && (
                <button ref={refUpdateButtonClose} onClick={closeUpdateInput}>
                  Закрыть
                </button>
              )}
              {!visibleInput && messageMore && (
                <button
                  onClick={() => setFullMessage(!fullMessage)}
                  className="more message__btn"
                >
                  {!fullMessage ? "Подробнее" : "Скрыть"}
                </button>
              )}
              <button
                ref={refAnswerButton}
                onClick={closeAnswerInput}
                className="answer message__btn"
              >
                {!showAnswerInput ? "Ответить" : "Закрыть"}
              </button>
            </div>
            {showAnswerInput && (
              <div className="input">
                <textarea
                  ref={refAnswerInput}
                  value={answerInputValue}
                  onChange={(e: any) => setAnswerInputValue(e.target.value)}
                  placeholder="Введите комментарий:"
                  maxLength={350}
                  rows={1}
                ></textarea>
                {answerInputValue.length === 350 && (
                  <p className="mark">
                    Максимальная размер сообщения 350 символов
                  </p>
                )}
                {answerInputValue.length > 0 && (
                  <svg onClick={onSubmit} width="20" height="20">
                    <use xlinkHref="../../static/img/icons/icons.svg#submit" />
                  </svg>
                )}
              </div>
            )}
            {answers && answers.length > 0 && (
              <div
                onClick={() => setShowAnswers(!showAnswers)}
                className={`show ${!showAnswers ? "active" : ""}`}
              >
                <svg width="20" height="20">
                  <use xlinkHref="../../static/img/icons/icons.svg#triangle" />
                </svg>
                <p>Ответы</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {answers && showAnswers && (
        <div className="answerList">
          {answers.map((obj) => (
            <Answer
              key={obj.id}
              {...obj}
              postId={post.id}
              parentId={id}
              addAnswer={addAnswer}
              removeAnswer={removeAnswer}
            />
          ))}
        </div>
      )}
    </div>
  );
};

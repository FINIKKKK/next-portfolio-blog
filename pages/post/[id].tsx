import React from "react";
import { PostLayout } from "../../layouts/PostLayout";

import ss from "./post.module.scss";

type postProps = {};

export default function postPage() {
  return (
    <PostLayout>
      <div className="posts">
        <div className="img">
          <img src="./img/post__img.jpg" alt="" />
        </div>
        <h3 className="title">
          Red selfies edison bulb four dollar toast humblebrag for the furniture
        </h3>
        <div className="info">
          <div className="item date">August 15, 2020 </div>
          <a href="#" className="item author">
            Ann Summers
          </a>
          <a href="#" className="item category">
            Bedroom Furniture
          </a>
        </div>
        <div className="content">
          <p className="text">
            Everyday carry actually neutra authentic kogi shabby chic migas
            small batch craft beer. Literally williamsburg tote bag
            farm-to-table mustache ugh deep v irony. Af man bun copper mug
            iPhone enamel pin pug selvage hammock palo santo godard thundercats
            coloring book yuccie woke. Ugh pok pok taxidermy pabst enamel pin
            edison bulb farm-to-table
          </p>
        </div>
      </div>

      <div className="tags post__tags">
        <h5 className="title">Метки</h5>
        <ul className="list">
          <li className="item">
            <a href="#">Bedroom furniture</a>
          </li>
          <li className="item">
            <a href="#">Office furniture</a>
          </li>
          <li className="item">
            <a href="#">Chair</a>
          </li>
        </ul>
      </div>

      <div className="navigation">
        <a href="#" className="item">
          <svg className="" width="20" height="20">
            <use xlinkHref="./static/img/icons/icons.svg#prev" />
          </svg>
          <p>Cred selfies edison bulb four dollar toast humblebrag</p>
        </a>
        <a href="#" className="item">
          <p>Cred selfies edison bulb four dollar toast humblebrag</p>
          <svg className="" width="20" height="20">
            <use xlinkHref="./static/img/icons/icons.svg#next" />
          </svg>
        </a>
      </div>

      <div className="comments">
        <div className="header">
          <h4 className="title">Комменты:</h4>
          <div className="input">
            <textarea
              className="active"
              placeholder="Введите комментарий:"
            ></textarea>
            <svg width="20" height="20">
              <use xlinkHref="./static/img/icons/icons.svg#submit" />
            </svg>
          </div>
        </div>

        <div className="list">
          @@include('./blocks/comment.html') @@include('./blocks/comment.html')
        </div>
      </div>
    </PostLayout>
  );
};

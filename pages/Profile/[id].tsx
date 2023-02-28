import { NextPage } from "next";
import { MainLayout } from "../../layouts/MainLayout";

interface ProfilePageProps {}

const ProfilePage: NextPage<ProfilePageProps> = ({}) => {
  return (
    <MainLayout>
      <div className="profile">
        <div className="container">
          <div className="inner">
            <div className="left">
              <a href="#" className="editAvatar">
                <img src="../../static/img/avatar.png" alt="avatar" className="avatar" />
                <div className="content">
                  <svg width="20" height="20">
                    <use xlinkHref="../../static/img/icons/icons.svg#edit" />
                  </svg>
                </div>
              </a>
              {/* <p className="label">1500 Подписчиков</p> */}
              {/* <button className="btn">Подписаться</button> */}
            </div>
            <div className="right">
              <h3 className=" name">Dmitriy Bozhko</h3>
              <p className="description">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.
              </p>
              <svg className="edit" width="20" height="20">
                <use xlinkHref="../../static/img/icons/icons.svg#edit" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="userPosts">
        <div className="container">
          <div className="inner">
            <div className="header">
              <h4 className="title">Посты</h4>
              <div className="search input active">
                <input type="text" placeholder="Поиск" />
                <svg width="20" height="20">
                  <use xlinkHref="../../static/img/icons/icons.svg#search" />
                </svg>
              </div>
            </div>

            <div className="list">
              <div className="item">
                <div className="img">
                  <img src="../../static/img/post__img.jpg" alt="" />
                  <div className="content">
                    <a href="#">
                      <svg width="20" height="20">
                        <use xlinkHref="../../static/img/icons/icons.svg#edit" />
                      </svg>
                    </a>
                    <a>
                      <svg width="20" height="20">
                        <use xlinkHref="../../static/img/icons/icons.svg#remove" />
                      </svg>
                    </a>
                  </div>
                </div>
                <a href="#" className="item__title">
                  Cred selfies edison bulb four dollar toast humblebrag
                </a>
                <div className="date">August 10, 2020</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;

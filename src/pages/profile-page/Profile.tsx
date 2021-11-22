import React, { FC } from "react";
import style from "../../styles/main.module.css";
import ProfileImage from "../../components/profile-image/ProfileImage";

const Profile: FC = () => (
  <div className={style.content}>
    <ProfileImage />
  </div>
);

export default Profile;

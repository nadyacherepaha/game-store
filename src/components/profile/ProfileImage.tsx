import React, { FC, useState } from "react";
import ReactFileReader from "react-file-reader";
import style from "./profileImage.module.scss";
import mainStyle from "../../styles/main.module.css";
import { IUserProfile } from "../../types/UserProfile";

interface IProfileImage extends IUserProfile {}

const ProfileImage: FC<IProfileImage> = ({ avatar }) => {
  const defaultAvatarUrl = "https://winnote.ru/wp-content/uploads/2016/01/1454222417_del_recent_avatar1.png";
  const isImg = avatar || defaultAvatarUrl;
  const [image, setImage] = useState<string>(isImg);

  const handleFiles = (files) => {
    setImage(files.base64);
  };

  return (
    <div>
      <img className={style.image} src={image} alt="" />
      <ReactFileReader base64 handleFiles={handleFiles}>
        <button className={mainStyle.btn} type="button">
          Change profile image
        </button>
      </ReactFileReader>
    </div>
  );
};

export default ProfileImage;

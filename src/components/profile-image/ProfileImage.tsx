import React, { FC, useState } from "react";
import btnStyle from "../../styles/main.module.css";
import style from "./profileImage.module.scss";
import { IUserProfile } from "../../types/UserProfile";

interface IProfileImage extends IUserProfile {}

const ProfileImage: FC<IProfileImage> = ({ avatar }) => {
  const [image, setImage] = useState([]);

  return (
    <>
      <div className={style.image}>
        <img src={avatar} alt="" />
      </div>
      <form>
        <input
          type="file"
          name="avatar"
          id="upload-file"
          className={style.input}
          accept=".jpg, .jpeg, .png, .gif"
          multiple
        />
        <label htmlFor="upload-file">
          <span className={btnStyle.btn}>Change profile image</span>
        </label>
      </form>
    </>
  );
};

export default ProfileImage;

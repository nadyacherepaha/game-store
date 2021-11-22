import React, { FC, useState } from "react";
import btnStyle from "../../styles/main.module.css";
import style from "./profileImage.module.scss";

const ProfileImage: FC = () => {
  const [avatar, setAvatar] = useState();

  return (
    <>
      <div className="image">
        <img src="" alt="" />
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

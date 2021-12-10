import React, { FC, useState, useEffect, memo } from "react";
import classNames from "classnames";
import style from "../../styles/main.module.css";
import { BASE_URL } from "../../constants/baseUrl";
import ProfileInfo from "../../components/profile/ProfileInfo";
import { IUserProfile } from "../../types/UserProfile";
import { getCurrentUser } from "../../services/auth.service";

const Profile: FC = () => {
  const [profile, setProfile] = useState<IUserProfile>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = getCurrentUser();
        const res = await fetch(`${BASE_URL}/get-profile?user=${currentUser}`);
        const resJson = await res.json();
        setProfile(resJson);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserProfile();
  }, []);

  if (!profile) {
    return <p>Loading</p>;
  }

  return (
    <div className={style.wrapper}>
      <div className={classNames(style.shadowContainer, style.content)}>
        <ProfileInfo description={profile.description} username={profile.username} avatar={profile.avatar} />
      </div>
    </div>
  );
};

export default memo(Profile);

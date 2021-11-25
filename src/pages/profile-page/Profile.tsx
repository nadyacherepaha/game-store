import React, { FC, useState, useEffect } from "react";
import style from "../../styles/main.module.css";
import { BASE_URL } from "../../utils";
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
      <div className={style.content}>
        <div className={style.shadowContainer}>
          <ProfileInfo description={profile.description} username={profile.username} avatar={profile.avatar} />
        </div>
      </div>
    </div>
  );
};

export default Profile;

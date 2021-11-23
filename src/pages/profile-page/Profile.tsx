import React, { FC, Fragment, useState, useEffect } from "react";
import style from "../../styles/main.module.css";
// import ProfileImage from "../../components/profile-image/ProfileImage";
import { BASE_URL } from "../../utils";
// import { IUserProfile } from "../../types/UserProfile";
import ProfileImage from "../../components/profile-image/ProfileImage";

const Profile: FC = () => {
  const [profile, setProfile] = useState([]);

  const currentUser = localStorage.getItem("user");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/profile?user=${currentUser}`);
        const resJson = await res.json();
        setProfile(resJson);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div className={style.content}>
      <div>
        {profile.length &&
          profile.map((results, index) => (
            <Fragment key={index}>
              <ProfileImage {...results} />
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default Profile;

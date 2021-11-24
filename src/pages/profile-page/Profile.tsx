import React, { FC, Fragment, useState, useEffect } from "react";
import style from "../../styles/main.module.css";
import { BASE_URL } from "../../utils";
import ProfileInfo, { currentUser } from "../../components/profile/ProfileInfo";

const Profile: FC = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/get-profile?user=${currentUser}`);
        const resJson = await res.json();
        setProfile(resJson);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUserProfile();
  }, [setProfile]);

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.shadowContainer}>
          {profile.length &&
            profile.map((results, index) => (
              <Fragment key={index}>
                <ProfileInfo {...results} />
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

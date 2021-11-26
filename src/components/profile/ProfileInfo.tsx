import React, { FC, useState } from "react";
import axios from "axios";
import { Form, Field } from "react-final-form";
import classNames from "classnames";
import style from "./profileImage.module.scss";
import mainStyle from "../../styles/main.module.css";
import styleForm from "../forms/form.module.scss";
import { BASE_URL } from "../../utils";
import FormInput from "../common/FormInput";
import TextAreaInput from "../common/TextAreaInput";
import { IUserProfile } from "../../types/UserProfile";
import ProfileImage from "./ProfileImage";
import { currentUser } from "../../services/auth.service";
import ChangePasswordModalForm from "../forms/change-password-form/ChangePasswordModalForm";

export interface IProfileFormValues extends IUserProfile {}

const ProfileInfo: FC<IUserProfile> = ({ username, description, avatar }) => {
  const [info, setInfo] = useState(description);
  const [name, setName] = useState(username);

  const onSubmitSaveProfile = async (values: IProfileFormValues) => {
    try {
      await axios.post(`${BASE_URL}/save-profile`, {
        username: values.username,
        description: values.description,
        login: currentUser,
      });
      setInfo(values.description);
      setName(values.username);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className={mainStyle.title}>
        <p>{name}</p>
      </div>
      <div className={style.desc}>
        <p>
          <strong>Description:</strong> {info}
        </p>
      </div>
      <div className={mainStyle.items}>
        <ProfileImage avatar={avatar} />
        <Form
          onSubmit={onSubmitSaveProfile}
          render={({ handleSubmit, submitting }) => (
            <form className={classNames(style.form, styleForm.form)} onSubmit={handleSubmit}>
              <div>
                <Field
                  label="Username"
                  type="text"
                  name="username"
                  component={FormInput}
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <Field
                  label="Profile description"
                  name="description"
                  component={TextAreaInput}
                  placeholder="Enter name, default address delivery, phone number or smth else"
                />
              </div>
              <div className={style.buttons}>
                <button className={style.btn} type="submit" disabled={submitting}>
                  Save profile
                </button>
                <ChangePasswordModalForm />
              </div>
            </form>
          )}
        />
      </div>
    </>
  );
};

export default ProfileInfo;

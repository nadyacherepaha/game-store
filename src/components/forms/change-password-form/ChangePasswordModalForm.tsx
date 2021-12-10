import React, { FC, useState } from "react";
import axios from "axios";
import { Form, Field } from "react-final-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import style from "../../profile/profileImage.module.scss";
import mainStyle from "../../../styles/main.module.css";
import styleForm from "../form.module.scss";
import { BASE_URL } from "../../../constants/baseUrl";
import FormInput from "../../common/FormInput";
import { IUserProfile } from "../../../types/UserProfile";
import { validateRegistrationForm } from "../validateForms";
import { getCurrentUser } from "../../../services/auth.service";

export interface IChangePassword extends IUserProfile {}

const ChangePasswordModalForm: FC<IChangePassword> = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const onSubmitChangePassword = async (values: IChangePassword) => {
    try {
      await axios.post(`${BASE_URL}/change-password`, {
        password: values.password,
        login: getCurrentUser(),
      });
      alert("Password has been changed!");
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Button className={style.btn} onClick={handleOpen}>
        Change password
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={styleForm.box}>
          <Typography className={styleForm.title}>Change your password</Typography>
          <Form
            onSubmit={onSubmitChangePassword}
            subscription={{ submitting: true }}
            validate={validateRegistrationForm}
            render={({ handleSubmit, submitting }) => (
              <form className={styleForm.form} onSubmit={handleSubmit}>
                <div>
                  <Field
                    label="Password"
                    type="password"
                    name="password"
                    component={FormInput}
                    placeholder="Password"
                  />
                </div>
                <div>
                  <Field
                    label="Repeat password"
                    type="password"
                    name="confirm"
                    component={FormInput}
                    placeholder="Repeat password"
                  />
                </div>
                <div>
                  <button className={mainStyle.btn} type="submit" disabled={submitting}>
                    Submit
                  </button>
                </div>
              </form>
            )}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ChangePasswordModalForm;

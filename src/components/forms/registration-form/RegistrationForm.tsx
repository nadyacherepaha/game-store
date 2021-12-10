import React, { FC } from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import style from "../form.module.scss";
import FormInput from "../../common/FormInput";
import { validateRegistrationForm } from "../validateForms";
import { BASE_URL } from "../../../constants/baseUrl";
import { IAuthFormValues } from "../../../types/User";

const RegistrationForm: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const onSubmit = async (values: IAuthFormValues) => {
    try {
      const response = await axios.post(`${BASE_URL}/registration`, {
        login: values.login,
        password: values.password,
        isAdmin: false,
      });
      alert(response.data.message);
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Button className={style.navButton} onClick={handleOpen}>
        Sign Up
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={style.box}>
          <Typography className={style.title}>Registration</Typography>
          <Form
            onSubmit={onSubmit}
            subscription={{ submitting: true }}
            validate={validateRegistrationForm}
            render={({ handleSubmit, form, submitting, pristine }) => (
              <form className={style.form} onSubmit={handleSubmit}>
                <div>
                  <Field label="Login" type="text" name="login" component={FormInput} placeholder="Login" />
                </div>
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
                <div className={style.buttons}>
                  <button type="submit" disabled={submitting}>
                    Submit
                  </button>
                  <button type="button" onClick={form.reset} disabled={submitting || pristine}>
                    Reset
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

export default RegistrationForm;

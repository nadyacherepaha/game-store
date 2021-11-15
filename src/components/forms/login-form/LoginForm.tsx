import React, { FC } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Form, Field } from "react-final-form";
import style from "../form.module.scss";
import FormInput from "../FormInput";
import { validateLoginForm } from "../validateForms";
import { BASE_URL } from "../../../utils";
import User from "../../../types/User";
import { Context } from "../../../context";

const LoginForm: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const { setIsAuth } = React.useContext(Context);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = async (values: User) => {
    await sleep(300);
    try {
      const url = `${BASE_URL}/login`;
      const response = await axios.post(url, values);
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(values));
      alert(`Welcome, ${values.login}!`);
      handleClose();
      console.log(response.data.message);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <>
      <Button className={style.navButton} onClick={handleOpen}>
        Sign In
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={style.box}>
          <Typography className={style.title}>Authorization</Typography>
          <Form
            onSubmit={onSubmit}
            validate={validateLoginForm}
            render={({ handleSubmit, submitting }) => (
              <form className={style.form} onSubmit={handleSubmit}>
                <div>
                  <label>Login</label>
                  <Field type="text" name="login" component={FormInput} placeholder="Login" />
                </div>
                <div>
                  <label>Password</label>
                  <Field type="password" name="password" component={FormInput} placeholder="Password" />
                </div>
                <div className={style.buttons}>
                  <button type="submit" disabled={submitting}>
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

export default LoginForm;

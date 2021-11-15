import React, { FC } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Form, Field } from "react-final-form";
import style from "../form.module.scss";
import FormInput from "../../common/FormInput";
import { validateLoginForm } from "../validateForms";
import { BASE_URL } from "../../../utils";
import { AuthFormValues } from "../../../types/User";
import { AuthContext } from "../../../contexts/AuthContext";

const LoginForm: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const { setIsAuth } = React.useContext(AuthContext);

  const onSubmit = async (values: AuthFormValues) => {
    try {
      await axios.post(`${BASE_URL}/login`, values);
      setIsAuth(true);
      localStorage.setItem("user", JSON.stringify(values));
      alert(`Welcome, ${values.login}!`);
      handleClose();
    } catch (e) {
      console.error(e.response.data.message);
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

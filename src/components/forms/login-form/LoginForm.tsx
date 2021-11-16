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
import { IAuthFormValues } from "../../../types/User";
import AuthContext from "../../../contexts/AuthContext";

const LoginForm: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const { signIn } = React.useContext(AuthContext);

  const onSubmit = async (values: IAuthFormValues) => {
    try {
      await axios.post(`${BASE_URL}/login`, values);
      alert(`Welcome, ${values.login}!`);
      signIn && signIn(values.login);
      handleClose();
    } catch (e) {
      console.error(e.message);
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

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
import { BASE_URL } from "../../../constants/baseUrl";
import { IAuthFormValues } from "../../../types/User";
import { writeUserToLocalStorage } from "../../../redux/actions/userActions";
import { useAppDispatch } from "../../../hooks/redux";
import { writeAdminToLocalStorage } from "../../../redux/actions/adminActions";

const LoginForm: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const dispatch = useAppDispatch();

  const onSubmit = async (values: IAuthFormValues) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, values);
      alert(`Welcome, ${values.login}!`);
      dispatch(writeUserToLocalStorage(values.login));
      if (res.data.admin) {
        dispatch(writeAdminToLocalStorage(res.data.admin));
      }
      handleClose();
    } catch (e) {
      console.error(e);
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
            subscription={{ submitting: true }}
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

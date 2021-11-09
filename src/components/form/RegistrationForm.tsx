import React, { FC } from "react";
import { Form, Field } from "react-final-form";
import style from "./form.module.scss";

interface Values {
  values: string;
  login: string;
  password: string;
  confirm: string;
}

export interface RegistrationFormProps {
  onSubmit: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    validate={(values: Values) => {
      const errors = {} as Values;
      const regularExpression = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
      if (!values.login) {
        errors.login = "Enter your username";
      }
      if (!values.password) {
        errors.password = "Enter password";
      }
      if (!regularExpression.test(values.password)) {
        errors.password = "The password must contain letters and numbers";
      }
      if (values.password && values.password.length < 6) {
        errors.password = "Password length must be atleast 6 characters";
      }
      if (!values.confirm) {
        errors.confirm = "Repeat the password";
      } else if (values.confirm !== values.password) {
        errors.confirm = "Passwords are not same";
      }
      return errors;
    }}
    render={({ handleSubmit, form, submitting, pristine }) => (
      <form className={style} onSubmit={handleSubmit}>
        <Field name="login">
          {({ input, meta }) => (
            <div>
              <label>Login</label>
              <input {...input} type="text" placeholder="Login" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <Field name="password">
          {({ input, meta }) => (
            <div>
              <label>Password</label>
              <input {...input} type="password" placeholder="Password" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <Field name="confirm">
          {({ input, meta }) => (
            <div>
              <label>Repeat password</label>
              <input {...input} type="password" placeholder="Repeat password" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
        <div>
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
);

export default RegistrationForm;

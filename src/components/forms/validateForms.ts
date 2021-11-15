import { AuthFormValues } from "../../types/User";

export const validateLoginForm = (values: AuthFormValues) => {
  const errors = {} as AuthFormValues;
  if (!values.login) {
    errors.login = "Enter your username";
  }
  if (!values.password) {
    errors.password = "Enter the password";
  }
  return errors;
};

export const validateRegistrationForm = (values: AuthFormValues) => {
  const errors = {} as AuthFormValues;
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
};

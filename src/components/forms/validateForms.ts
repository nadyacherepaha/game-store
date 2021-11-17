import { IAuthFormValues } from "../../types/User";

export const validateLoginForm = (values: IAuthFormValues) => {
  const errors = {} as IAuthFormValues;
  if (!values.login) {
    errors.login = "Enter your username";
  }
  if (!values.password) {
    errors.password = "Enter the password";
  }

  return errors;
};

export const validateRegistrationForm = (values: IAuthFormValues) => {
  const errors = {} as IAuthFormValues;
  const regularExpression = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
  const passwordLength = 6;
  validateLoginForm(values);

  if (!regularExpression.test(values.password)) {
    errors.password = "The password must contain letters and numbers";
  }
  if (values.password?.length < passwordLength) {
    errors.password = `Password length must be atleast ${passwordLength} characters`;
  }
  if (!values.confirm) {
    errors.confirm = "Repeat the password";
  } else if (values.confirm !== values.password) {
    errors.confirm = "Passwords are not same";
  }

  return errors;
};

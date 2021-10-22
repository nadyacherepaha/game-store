import React, { FC } from "react";
import { AlertTitle, Alert } from "@mui/material";
import style from "./errorPage.module.scss";

export interface ErrorPageProps {}

const ErrorPage: FC<ErrorPageProps> = () => (
  <div className={style.errorMessage}>
    <Alert className={style.title} severity="error">
      <AlertTitle>
        <strong>Oh-no! Something went wrong</strong>
      </AlertTitle>
      You can refresh the page or try again later.
    </Alert>
  </div>
);

export default ErrorPage;

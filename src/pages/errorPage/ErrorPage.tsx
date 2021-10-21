import React, { FC } from "react";
import { AlertTitle, Alert } from "@mui/material";

export interface ErrorPageProps {}

const ErrorPage: FC<ErrorPageProps> = () => (
  <div className="error-message">
    <Alert className="error-message__title" severity="error">
      <AlertTitle>
        <strong>Oh-no! Something went wrong</strong>
      </AlertTitle>
      You can refresh the page or try again later.
    </Alert>
  </div>
);

export default ErrorPage;

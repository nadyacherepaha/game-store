import React, { FC } from "react";
import { AlertTitle, Alert, Button } from "@mui/material";
import classNames from "classnames";
import style from "./errorPage.module.scss";
import mainStyle from "../../styles/main.module.css";

const ErrorPage: FC = () => {
  const onReloadPage = () => window.location.reload();

  return (
    <div className={classNames(mainStyle.content, style.errorMessage)}>
      <Alert className={style.title} severity="error">
        <AlertTitle>
          <strong>Oh-no! Something went wrong</strong>
        </AlertTitle>
        You can refresh the page or try again later.
        <br />
        <Button className={style.btn} variant="outlined" color="error" value="Reload Page" onClick={onReloadPage}>
          Reload the page
        </Button>
      </Alert>
    </div>
  );
};

export default ErrorPage;

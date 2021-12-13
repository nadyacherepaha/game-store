import React, { FC, memo } from "react";
import { Field } from "react-final-form";
import CheckboxInput from "../../common/CheckboxInput";
import { pc, playstation, xbox } from "../../../constants/category";
import style from "./editCardForm.module.scss";

const PlatformField: FC = () => (
  <div className={style.platform}>
    <p>Platform</p>
    <div className={style.field}>
      <Field title="PC" name={pc} component={CheckboxInput} type="checkbox" />
      <Field title="PlayStation 5" name={playstation} component={CheckboxInput} type="checkbox" />
      <Field title="XBox One" name={xbox} component={CheckboxInput} type="checkbox" />
    </div>
  </div>
);
export default memo(PlatformField);

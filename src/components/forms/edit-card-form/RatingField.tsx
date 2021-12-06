import React, { FC } from "react";
import { Field } from "react-final-form";
import SelectInput from "../../common/SelectInput";
import style from "./editCardForm.module.scss";

const RatingField: FC = () => (
  <div className={style.field}>
    <Field className={style.select} title="Rating" name="rating" component={SelectInput}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </Field>
  </div>
);

export default RatingField;

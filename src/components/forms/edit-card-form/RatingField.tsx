import React, { FC } from "react";
import { Field } from "react-final-form";
import SelectInput, { items } from "../../common/SelectInput";
import style from "./editCardForm.module.scss";

const RatingField: FC = () => (
  <div className={style.field}>
    <Field className={style.select} title="Rating" name="rating" component={SelectInput}>
      {items.map((result) => (
        <>
          <option key={result.key} value={result.value}>
            {result.value}
          </option>
        </>
      ))}
    </Field>
  </div>
);

export default RatingField;

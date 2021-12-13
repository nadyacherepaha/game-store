import React, { FC, memo } from "react";
import { Field } from "react-final-form";
import SelectInput, { ISelectedItem } from "../../common/SelectInput";
import style from "./editCardForm.module.scss";

const items: ISelectedItem[] = [
  { key: 1, value: "1" },
  { key: 2, value: "2" },
  { key: 3, value: "3" },
  { key: 4, value: "4" },
  { key: 5, value: "5" },
];

const RatingField: FC = () => (
  <div className={style.field}>
    <Field className={style.select} items={items} title="Rating" name="rating" component={SelectInput} />
  </div>
);

export default memo(RatingField);

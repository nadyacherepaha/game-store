import React, { FC, memo } from "react";
import { Field } from "react-final-form";
import { Genres } from "../../../constants/filterFormEnum";
import SelectInput, { ISelectedItem } from "../../common/SelectInput";
import style from "./editCardForm.module.scss";

const items: ISelectedItem[] = [
  { key: 1, value: Genres.Action },
  { key: 2, value: Genres.Sandbox },
  { key: 3, value: Genres.Shooter },
  { key: 4, value: Genres.Simulator },
  { key: 5, value: Genres.RPG },
];

const GenresField: FC = () => (
  <div className={style.field}>
    <Field className={style.select} title="Genre" items={items} name="genre" component={SelectInput} />
  </div>
);

export default memo(GenresField);

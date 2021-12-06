import React, { FC } from "react";
import { Field } from "react-final-form";
import SelectInput from "../../common/SelectInput";
import { Genres } from "../../../constants/filterFormEnum";
import style from "./editCardForm.module.scss";

const GenresField: FC = () => (
  <div className={style.field}>
    <Field className={style.select} title="Genre" name="genre" component={SelectInput}>
      <option value={Genres.Action}>Action-adventure</option>
      <option value={Genres.Sandbox}>Sandbox</option>
      <option value={Genres.Shooter}>Shooter</option>
      <option value={Genres.Simulator}>Simulator</option>
      <option value={Genres.RPG}>RPG</option>
    </Field>
  </div>
);

export default GenresField;

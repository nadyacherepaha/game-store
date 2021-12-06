import React, { FC } from "react";
import { Field } from "react-final-form";
import SelectInput from "../../common/SelectInput";
import { Ages } from "../../../constants/filterFormEnum";
import style from "./editCardForm.module.scss";

const AgesField: FC = () => (
  <div className={style.field}>
    <Field className={style.select} title="Age" name="ageLimit" component={SelectInput}>
      <option value={Ages.Three}>3+</option>
      <option value={Ages.Six}>6+</option>
      <option value={Ages.Twelve}>12+</option>
      <option value={Ages.Sixteen}>16+</option>
      <option value={Ages.Eighteen}>18+</option>
    </Field>
  </div>
);

export default AgesField;

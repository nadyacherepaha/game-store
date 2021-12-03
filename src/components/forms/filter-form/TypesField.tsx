import React from "react";
import { Field } from "react-final-form";
import SelectInput from "../../common/SelectInput";
import style from "../form.module.scss";
import { Types } from "../../../constants/filterFormEnum";

const TypesField: React.FC = () => (
  <div className={style.select}>
    <Field title="Type" name="type" component={SelectInput}>
      <option value={Types.Ascending}>Ascending</option>
      <option value={Types.Descending}>Descending</option>
    </Field>
  </div>
);

export default TypesField;

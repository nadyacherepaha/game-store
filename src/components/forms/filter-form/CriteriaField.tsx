import React from "react";
import { Field } from "react-final-form";
import SelectInput from "../../common/SelectInput";
import style from "../form.module.scss";
import { Criteria } from "../../../constants/filterFormEnum";

const CriteriaForm: React.FC = () => (
  <div className={style.select}>
    <Field title="Criteria" name="criteria" component={SelectInput}>
      <option value={Criteria.Name}>Name</option>
      <option value={Criteria.Rating}>Rating</option>
      <option value={Criteria.Price}>Price</option>
    </Field>
  </div>
);

export default CriteriaForm;

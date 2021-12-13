import React, { memo } from "react";
import { Field } from "react-final-form";
import SelectInput, { ISelectedItem } from "../../common/SelectInput";
import style from "../form.module.scss";
import { Criteria } from "../../../constants/filterFormEnum";

const items: ISelectedItem[] = [
  { key: 1, value: Criteria.Name },
  { key: 2, value: Criteria.Rating },
  { key: 3, value: Criteria.Price },
];

const CriteriaForm: React.FC = () => (
  <div className={style.select}>
    <Field title="Criteria" name="criteria" items={items} component={SelectInput} />
  </div>
);

export default memo(CriteriaForm);

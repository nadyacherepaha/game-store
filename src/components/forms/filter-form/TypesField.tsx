import React, { memo } from "react";
import { Field } from "react-final-form";
import SelectInput, { ISelectedItem } from "../../common/SelectInput";
import style from "../form.module.scss";
import { Types } from "../../../constants/filterFormEnum";

const items: ISelectedItem[] = [
  { key: 1, value: Types.Ascending },
  { key: 2, value: Types.Descending },
];

const TypesField: React.FC = () => (
  <div className={style.select}>
    <Field title="Type" name="type" items={items} component={SelectInput} />
  </div>
);

export default memo(TypesField);

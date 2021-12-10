import React, { memo } from "react";
import { Field } from "react-final-form";
import style from "../form.module.scss";
import { Ages } from "../../../constants/filterFormEnum";
import RadioInput from "../../common/RadioInput";

const ageFieldName = "age";

const AgesField: React.FC = () => (
  <div className={style.block}>
    <p>Age</p>
    <div className={style.formControl}>
      <div className={style.radioInput}>
        <Field label="All ages" name={ageFieldName} component={RadioInput} type="radio" value={Ages.All as string} />
      </div>
      <div className={style.radioInput}>
        <Field label="3+" name={ageFieldName} component={RadioInput} type="radio" value={Ages.Three as string} />
      </div>
      <div className={style.radioInput}>
        <Field label="6+" name={ageFieldName} component={RadioInput} type="radio" value={Ages.Six as string} />
      </div>
      <div className={style.radioInput}>
        <Field label="12+" name={ageFieldName} component={RadioInput} type="radio" value={Ages.Twelve as string} />
      </div>
      <div className={style.radioInput}>
        <Field label="16+" name={ageFieldName} component={RadioInput} type="radio" value={Ages.Sixteen as string} />
      </div>
      <div className={style.radioInput}>
        <Field label="18+" name={ageFieldName} component={RadioInput} type="radio" value={Ages.Eighteen as string} />
      </div>
    </div>
  </div>
);

export default memo(AgesField);

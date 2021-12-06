import React, { FC } from "react";
import { Field } from "react-final-form";
import MultiCheckboxInput from "../../common/MultiCheckboxInput";
import { pc, playstation, xbox } from "@/constants/category";
import style from "./editCardForm.module.scss";

const PlatformField: FC = () => {
  const platformFieldName = "platform";

  return (
    <div className={style.platform}>
      <p>Platform</p>
      <div className={style.field}>
        <Field label="PC" name={platformFieldName} component={MultiCheckboxInput} type="checkbox" value={pc} />
        <Field
          label="PlayStation 5"
          name={platformFieldName}
          component={MultiCheckboxInput}
          type="checkbox"
          value={playstation}
        />
        <Field label="XBox One" name={platformFieldName} component={MultiCheckboxInput} type="checkbox" value={xbox} />
      </div>
    </div>
  );
};

export default PlatformField;

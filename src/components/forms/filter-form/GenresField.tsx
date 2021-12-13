import React, { memo } from "react";
import { Field } from "react-final-form";
import RadioInput from "../../common/RadioInput";
import style from "../form.module.scss";
import { Genres } from "../../../constants/filterFormEnum";

const genresFieldName = "genres";

const GenresField: React.FC = () => (
  <div className={style.block}>
    <p>Genres</p>
    <div className={style.formControl}>
      <div className={style.radioInput}>
        <Field
          className={{ display: "flex" }}
          label="All games"
          name={genresFieldName}
          component={RadioInput}
          type="radio"
          value={Genres.All as string}
        />
      </div>
      <div className={style.radioInput}>
        <Field
          label="Shooter"
          name={genresFieldName}
          component={RadioInput}
          type="radio"
          value={Genres.Shooter as string}
        />
      </div>
      <div className={style.radioInput}>
        <Field
          label="Sandbox"
          name={genresFieldName}
          component={RadioInput}
          type="radio"
          value={Genres.Sandbox as string}
        />
      </div>
      <div className={style.radioInput}>
        <Field label="RPG" name={genresFieldName} component={RadioInput} type="radio" value={Genres.RPG as string} />
      </div>
      <div className={style.radioInput}>
        <Field
          label="Action-adventures"
          name={genresFieldName}
          component={RadioInput}
          type="radio"
          value={Genres.Action as string}
        />
      </div>
      <div className={style.radioInput}>
        <Field
          label="Simulator"
          name={genresFieldName}
          component={RadioInput}
          type="radio"
          value={Genres.Simulator as string}
        />
      </div>
    </div>
  </div>
);

export default memo(GenresField);

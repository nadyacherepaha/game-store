import React from "react";
import { Form, Field } from "react-final-form";
import classNames from "classnames";
import RadioInput from "../../common/RadioInput";
import SelectInput from "../../common/SelectInput";
import style from "../form.module.scss";
import { Genres, Types, Criteria, Ages, IFilterFormProps } from "../../../types/FilterForm";

export const initialFilterValues = {
  genres: Genres.All,
  age: Ages.All,
  criteria: Criteria.Name,
  type: Types.Ascending,
};

const FilterForm: React.FC<IFilterFormProps> = ({ getFilteredResult }) => (
  <Form
    onSubmit={getFilteredResult}
    initialValues={initialFilterValues}
    render={({ handleSubmit }) => (
      <form onChange={handleSubmit} className={classNames(style.form, style.filterForm)} onSubmit={handleSubmit}>
        <div className={style.select}>
          <Field span="Criteria" name="criteria" component={SelectInput}>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </Field>
        </div>
        <div className={style.select}>
          <Field span="Type" name="type" component={SelectInput}>
            <option value={Types.Ascending}>Ascending</option>
            <option value={Types.Descending}>Descending</option>
          </Field>
        </div>
        <div className={style.block}>
          <label>Genres</label>
          <div className={style.formControl}>
            <div className={style.radioInput}>
              <Field
                className={{ display: "flex" }}
                label="All games"
                name="genres"
                component={RadioInput}
                type="radio"
                value={Genres.All}
              />
            </div>
            <div className={style.radioInput}>
              <Field label="Shooter" name="genres" component={RadioInput} type="radio" value={Genres.Shooter} />
            </div>
            <div className={style.radioInput}>
              <Field label="Sandbox" name="genres" component={RadioInput} type="radio" value={Genres.Sandbox} />
            </div>
            <div className={style.radioInput}>
              <Field label="RPG" name="genres" component={RadioInput} type="radio" value={Genres.RPG} />
            </div>
            <div className={style.radioInput}>
              <Field
                label="Action-adventures"
                name="genres"
                component={RadioInput}
                type="radio"
                value={Genres.Action}
              />
            </div>
            <div className={style.radioInput}>
              <Field label="Simulator" name="genres" component={RadioInput} type="radio" value={Genres.Simulator} />
            </div>
          </div>
        </div>
        <div className={style.block}>
          <label>Age</label>
          <div className={style.formControl}>
            <div className={style.radioInput}>
              <Field label="All ages" name="age" component={RadioInput} type="radio" value={Ages.All} />
            </div>
            <div className={style.radioInput}>
              <Field label="3+" name="age" component={RadioInput} type="radio" value={Ages.Three} />
            </div>
            <div className={style.radioInput}>
              <Field label="6+" name="age" component={RadioInput} type="radio" value={Ages.Six} />
            </div>
            <div className={style.radioInput}>
              <Field label="12+" name="age" component={RadioInput} type="radio" value={Ages.Twelve} />
            </div>
            <div className={style.radioInput}>
              <Field label="16+" name="age" component={RadioInput} type="radio" value={Ages.Sixteen} />
            </div>
            <div className={style.radioInput}>
              <Field label="18+" name="age" component={RadioInput} type="radio" value={Ages.Eighteen} />
            </div>
          </div>
        </div>
      </form>
    )}
  />
);

export default FilterForm;

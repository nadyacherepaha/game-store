import React from "react";
import { Form, Field } from "react-final-form";
import classNames from "classnames";
import RadioInput from "../../common/RadioInput";
import SelectInput from "../../common/SelectInput";
import style from "../form.module.scss";
import { Genres, Types, Criteria, Ages, IFilterFormProps } from "../../../types/FilterForm";

const FilterForm: React.FC<IFilterFormProps> = ({ getFilteredResult }) => (
  <Form
    onSubmit={getFilteredResult}
    initialValues={{ genres: Genres.all, age: Age.all, criteria: Criteria.name, type: Type.ascending }}
    render={({ handleSubmit }) => (
      <form onChange={handleSubmit} className={classNames(style.form, style.filterForm)} onSubmit={handleSubmit}>
        <div className={style.select}>
          <Field label="Criteria" name="criteria" component={SelectInput}>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </Field>
        </div>
        <div className={style.select}>
          <Field label="Type" name="type" component={SelectInput}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </Field>
        </div>
        <div className={style.block}>
          <label>Genres</label>
          <div className={style.formControl}>
            <label>
              <Field name="genres" component={RadioInput} type="radio" value="" /> All games
            </label>
            <label>
              <Field name="genres" component={RadioInput} type="radio" value="Shooter" /> Shooter
            </label>
            <label>
              <Field name="genres" component={RadioInput} type="radio" value="Sandbox" /> Sandbox
            </label>
            <label>
              <Field name="genres" component={RadioInput} type="radio" value="RPG" /> RPG
            </label>
            <label>
              <Field name="genres" component={RadioInput} type="radio" value="Action-adventure" /> Action-adventures
            </label>
            <label>
              <Field name="genres" component={RadioInput} type="radio" value="Simulator" /> Simulator
            </label>
          </div>
        </div>
        <div className={style.block}>
          <label>Age</label>
          <div className={style.formControl}>
            <label>
              <Field name="age" component={RadioInput} type="radio" value="" /> All ages
            </label>
            <label>
              <Field name="age" component={RadioInput} type="radio" value="3" /> 3+
            </label>
            <label>
              <Field name="age" component={RadioInput} type="radio" value="6" /> 6+
            </label>
            <label>
              <Field name="age" component={RadioInput} type="radio" value="12" /> 12+
            </label>
            <label>
              <Field name="age" component={RadioInput} type="radio" value="16" /> 16+
            </label>
            <label>
              <Field name="age" component={RadioInput} type="radio" value="18" /> 18+
            </label>
          </div>
        </div>
      </form>
    )}
  />
);

export default FilterForm;

import React from "react";
import { Form, Field } from "react-final-form";
import classNames from "classnames";
import RadioInput from "../../common/RadioInput";
import SelectInput from "../../common/SelectInput";
import style from "../form.module.scss";

type Genres = "all" | "Shooter" | "Sandbox" | "RPG" | "Action-adventure" | "Simulator";
type Age = "all" | "3" | "6" | "12" | "16" | "18";
interface IFilterFormValues {
  criteria?: string[];
  type?: string;
  genres: Genres;
  age: Age;
}

const onFormChange = (values: IFilterFormValues) => {
  console.log(values);
};

const FilterForm: React.FC = () => (
  <Form
    onSubmit={onFormChange}
    initialValues={{ genres: "all", age: "all", criteria: "name", type: "ascending" }}
    render={({ handleSubmit, values }) => (
      <form onChange={handleSubmit} className={classNames(style.form, style.filterForm)} onSubmit={handleSubmit}>
        <div className={style.select}>
          <Field label="Criteria" name="criteria" component={SelectInput}>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </Field>
        </div>
        <div className={style.select}>
          <Field label="Type" name="favoriteColor" component={SelectInput}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </Field>
        </div>
        <div className={style.block}>
          <label>Genres</label>
          <div className={style.formControl}>
            <label>
              <Field name="genres" component={RadioInput} type="radio" value="all" /> All games
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
              <Field name="age" component={RadioInput} type="radio" value="all" /> All ages
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

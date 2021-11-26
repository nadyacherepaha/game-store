import React from "react";
import { Form, Field } from "react-final-form";
import classNames from "classnames";
import RadioInput from "../../common/RadioInput";
import SelectInput from "../../common/SelectInput";
import style from "../form.module.scss";
import { BASE_URL } from "../../../utils";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Genres = "all" | "shooter" | "sandbox" | "rpg" | "action" | "simulator";
type Age = "all" | "3" | "6" | "12" | "16" | "18";
interface IFilterFormValues {
  criteria?: string;
  type?: string;
  genres: Genres;
  age: Age;
}

const onSubmit = async (values: IFilterFormValues) => {
  await sleep(300);
  window.alert(JSON.stringify(values, undefined, 2));
};

const onChange = async (values: IFilterFormValues) => {
  try {
    await fetch(
      `${BASE_URL}/games?criteria=${values.criteria}&type=${values.type}&genre=${values.genres}&age=${values.age}`
    );
  } catch (e) {
    console.error(e);
  }
};

const FilterForm: React.FC = () => (
  <Form
    onSubmit={onSubmit}
    initialValues={{ genres: "all", age: "all", criteria: "name", type: "ascending" }}
    render={({ handleSubmit, values }) => (
      <form
        onChange={() => onChange(values)}
        className={classNames(style.form, style.filterForm)}
        onSubmit={handleSubmit}
      >
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
              <Field name="genres" component={RadioInput} type="radio" value="shooter" /> Shooter
            </label>
            <label>
              <Field name="genres" component={RadioInput} type="radio" value="sandbox" /> Sandbox
            </label>
            <label>
              <Field name="genres" component={RadioInput} type="radio" value="rpg" /> RPG
            </label>
            <label>
              <Field name="genres" component={RadioInput} type="radio" value="action" /> Action-adventures
            </label>
            <label>
              <Field name="genres" component={RadioInput} type="radio" value="simulator" /> Simulator
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

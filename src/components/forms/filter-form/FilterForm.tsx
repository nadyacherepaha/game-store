import React from "react";
import { Form } from "react-final-form";
import classNames from "classnames";
import style from "../form.module.scss";
import { Genres, Ages, Types, Criteria } from "../../../constants/filterFormEnum";
import { IFilterFormProps } from "../../../types/FilterForm";
import CriteriaForm from "./CriteriaField";
import TypesField from "./TypesField";
import GenresField from "./GenresField";
import AgesField from "./AgesField";

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
        <CriteriaForm />
        <TypesField />
        <GenresField />
        <AgesField />
      </form>
    )}
  />
);

export default FilterForm;

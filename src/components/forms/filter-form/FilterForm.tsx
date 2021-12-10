import React, { memo } from "react";
import { Form } from "react-final-form";
import classNames from "classnames";
import style from "../form.module.scss";
import { IFilterFormProps, initialSearchPanelFilterValues } from "../../../types/FilterForm";
import CriteriaForm from "./CriteriaField";
import TypesField from "./TypesField";
import GenresField from "./GenresField";
import AgesField from "./AgesField";

const FilterForm: React.FC<IFilterFormProps> = ({ getFilteredResult }) => (
  <Form
    onSubmit={getFilteredResult}
    initialValues={initialSearchPanelFilterValues}
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

export default memo(FilterForm);

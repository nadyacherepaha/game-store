import React from "react";
import { FieldRenderProps } from "react-final-form";
import { IFilterFormValues } from "../../types/FilterForm";

export interface IRadioInput extends IFilterFormValues, FieldRenderProps<string> {
  label: string;
}

const RadioInput: React.FC<IRadioInput> = ({ input, meta, label, ...rest }: IRadioInput) => (
  <>
    <input type="radio" {...input} {...rest} />
    <label>{label}</label>
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </>
);

export default RadioInput;

import React from "react";
import { FieldRenderProps } from "react-final-form";

interface ICheckboxInput extends FieldRenderProps<boolean> {
  label: string;
}

const CheckboxInput: React.FC<ICheckboxInput> = ({ label, input: { value, ...input } }: ICheckboxInput) => (
  <>
    <label>{label}</label>
    <input {...input} type="checkbox" checked={value} />
  </>
);

export default CheckboxInput;

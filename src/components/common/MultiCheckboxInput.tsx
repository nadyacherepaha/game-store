import React from "react";
import { FieldRenderProps } from "react-final-form";

interface ICheckboxInput extends FieldRenderProps<string> {
  label: string;
}

const MultiCheckboxInput: React.FC<ICheckboxInput> = ({ label, input }: ICheckboxInput) => (
  <>
    <label>{label}</label>
    <input {...input} type="checkbox" />
  </>
);

export default MultiCheckboxInput;

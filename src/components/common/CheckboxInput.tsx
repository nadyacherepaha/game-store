import React from "react";
import { FieldRenderProps } from "react-final-form";

interface ICheckboxInput extends FieldRenderProps<boolean> {
  title: string;
}

const CheckboxInput: React.FC<ICheckboxInput> = ({ title, input: { value, ...input } }: ICheckboxInput) => (
  <>
    <span>{title}</span>
    <input {...input} type="checkbox" checked={value} />
  </>
);

export default CheckboxInput;

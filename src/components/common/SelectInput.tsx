import React from "react";
import { FieldRenderProps } from "react-final-form";

interface ISelectInput extends FieldRenderProps<string> {
  label: string;
}

const SelectInput: React.FC<ISelectInput> = ({ label, input, ...rest }: ISelectInput) => (
  <>
    <label>{label}</label>
    <select {...input} {...rest} />
  </>
);

export default SelectInput;

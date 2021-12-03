import React from "react";
import { FieldRenderProps } from "react-final-form";

interface ISelectInput extends FieldRenderProps<string> {
  title: string;
}

const SelectInput: React.FC<ISelectInput> = ({ title, input, ...rest }: ISelectInput) => (
  <>
    <span>{title}</span>
    <select {...input} {...rest} />
  </>
);

export default SelectInput;

import React from "react";
import { FieldRenderProps } from "react-final-form";

interface ISelectInput extends FieldRenderProps<string> {
  span: string;
}

const SelectInput: React.FC<ISelectInput> = ({ span, input, ...rest }: ISelectInput) => (
  <>
    <span>{span}</span>
    <select {...input} {...rest} />
  </>
);

export default SelectInput;

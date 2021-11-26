import React from "react";
import { FieldRenderProps } from "react-final-form";

interface IRadioInput extends FieldRenderProps<string> {}

const RadioInput: React.FC<IRadioInput> = ({ input, meta, ...rest }: IRadioInput) => (
  <>
    <input type="radio" {...input} {...rest} />
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </>
);

export default RadioInput;

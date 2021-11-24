import React from "react";
import { FieldRenderProps } from "react-final-form";

interface ITextAreaInput extends FieldRenderProps<string> {
  label: string;
}

const TextAreaInput: React.FC<ITextAreaInput> = ({ label, input, ...rest }: ITextAreaInput) => (
  <>
    <label>{label}</label>
    <textarea {...input} {...rest} />
  </>
);

export default TextAreaInput;

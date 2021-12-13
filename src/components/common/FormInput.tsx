import React, { memo } from "react";
import { FieldRenderProps } from "react-final-form";

interface IFormInput extends FieldRenderProps<string> {
  label: string;
}

const FormInput: React.FC<IFormInput> = ({ label, input, meta, ...rest }: IFormInput) => (
  <>
    <label>{label}</label>
    <input {...input} {...rest} />
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </>
);

export default memo(FormInput);

import React from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<string>;

const FormInput: React.FC<Props> = ({ label, input, meta, ...rest }: Props) => (
  <>
    <label>{label}</label>
    <input {...input} {...rest} />
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </>
);

export default FormInput;

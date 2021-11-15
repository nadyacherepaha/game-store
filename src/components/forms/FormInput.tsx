import React from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<string, any>;

const FormInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <>
    <input {...input} {...rest} />
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </>
);

export default FormInput;

import React from "react";
import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<string, any>;

const LoginInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <>
    <input type="text" {...input} {...rest} />
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </>
);

export default LoginInput;

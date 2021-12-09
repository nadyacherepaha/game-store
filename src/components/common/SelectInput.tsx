import React from "react";
import { FieldRenderProps } from "react-final-form";

interface ISelectInput extends FieldRenderProps<string> {
  title: string;
}

export interface ISelectedItem {
  key: number;
  value: string;
}

export const items: ISelectedItem[] = [
  { key: 1, value: "1" },
  { key: 2, value: "2" },
  { key: 3, value: "3" },
  { key: 4, value: "4" },
  { key: 5, value: "5" },
];

const SelectInput: React.FC<ISelectInput> = ({ title, input, ...rest }: ISelectInput) => (
  <>
    <span>{title}</span>
    <select {...input} {...items} {...rest} />
  </>
);

export default SelectInput;

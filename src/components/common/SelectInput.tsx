import React from "react";
import { FieldRenderProps } from "react-final-form";

interface ISelectInput extends FieldRenderProps<string> {
  title: string;
  items: ISelectedItem[];
}

export interface ISelectedItem {
  key: number;
  value: string;
}

const SelectInput: React.FC<ISelectInput> = ({ items, title, input, ...rest }: ISelectInput) => (
  <>
    <span>{title}</span>
    <select {...input} {...rest}>
      {items.map((result) => (
        <option key={result.key} value={result.value}>
          {result.value}
        </option>
      ))}
    </select>
  </>
);

export default SelectInput;

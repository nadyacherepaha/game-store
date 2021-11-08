import React, { FC } from "react";
import style from "./searchInput.module.scss";

export interface ISearchInputProps {
  value: string;
  onChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<ISearchInputProps> = ({ value, onChangeText }) => (
  <div className={style.container}>
    <input className={style.searchInput} type="text" value={value} onChange={onChangeText} placeholder="Search" />
  </div>
);
export default SearchInput;

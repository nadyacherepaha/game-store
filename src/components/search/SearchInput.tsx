import React, { FC } from "react";
import style from "./searchInput.module.scss";

export interface ISearchInputProps {
  value: string;
  onChangeText: string;
}

const SearchInput: FC<ISearchInputProps> = ({ value, onChangeText }) => {
  React.useEffect(() => {
    const input = document.querySelector("input");
    input.addEventListener("input", onChangeText);

    return input.removeEventListener("input", onChangeText);
  }, []);

  return (
    <div className={style.container}>
      <input className={style.searchInput} type="text" value={value} onChange={onChangeText} placeholder="Search" />
    </div>
  );
};

export default SearchInput;

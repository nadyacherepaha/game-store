import React, { FC, memo } from "react";
import style from "./categories.module.scss";
import CategoryItem from "./category-item/CategoryItem";

const Categories: FC = () => (
  <div className={style.wrapper}>
    <div className={style.title}>
      <p>Categories</p>
    </div>
    <div className={style.items}>
      <CategoryItem />
    </div>
  </div>
);

export default memo(Categories);

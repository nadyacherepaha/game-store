import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import style from "./categoryItem.module.scss";
import category from "../../../constants/category";

const CategoryItem: FC = () => {
  const memoCategory = useMemo(
    () =>
      category.map(({ icon, title, link }) => (
        <div key={title}>
          <Link className={style.item} to={link}>
            <FontAwesomeIcon icon={icon} />
            <p>{title}</p>
          </Link>
        </div>
      )),
    [category]
  );

  return <>{memoCategory}</>;
};

export default CategoryItem;

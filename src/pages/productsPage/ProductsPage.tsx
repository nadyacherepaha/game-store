import React, { FunctionComponent } from "react";
import Header from "../../components/header/Header";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => (
  <div>
    <Header />
    <div>Products Page</div>
  </div>
);

export default Products;

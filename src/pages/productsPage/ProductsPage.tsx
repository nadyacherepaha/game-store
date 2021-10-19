import React, { FunctionComponent } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => (
  <div>
    <Header />
    <div className="content">
      <span className="content__title">Product Page</span>
    </div>
    <Footer />
  </div>
);

export default Products;

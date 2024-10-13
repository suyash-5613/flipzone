import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";

function Product() {
  const { all_product } = useContext(ShopContext);
  const { id } = useParams();
  const product = all_product.find((product) => product.id === Number(id));
  return (
    <>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </>
  );
}

export default Product;

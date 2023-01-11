import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { getProductsBySlug } from "../../actions";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
const ProductList = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [priceRange,setPriceRange]=useState({
      under5k:5000,
      under10k:10000,
      under15k:15000,
      under20k:20000,
      under30k:30000,
    });
  const product = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProductsBySlug(params.slug));
  }, []);
  return (
    <>
      <Layout>
        { 
          Object.keys(product.productsByPrice).map((key, index) => {
            console.log("key",key)
          return (
            <div className="card">
              <div className="cardHeader">
                <div>{params.slug} under {priceRange[key]}</div>
                <button>view all</button>
              </div>
              <div>
              {
                product.productsByPrice[key].map(product=>
                <div className="productContainer">
                <div className="productImgContainer">
                  <img
                    src={generatePublicUrl(product.productPictures[0].img)}
                    alt="img"
                  />
                </div>
                <div className="productInfo">
                  <div style={{ margin: "5px 0" }}> {product.name}</div>
                  <div>
                    <span>4.3</span>
                    <span>3353</span>
                  </div>
                  <div className="productPrice">{product.price}</div>
                </div>
              </div>
                )
              }              
              </div>
            </div>
          );
        })}
      </Layout>
    </>
  );
};
export default ProductList;

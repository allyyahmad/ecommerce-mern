import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="pt-10 fade-in-up">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2">
            {productData.image.map((item, index) => (
              <img
                key={index}
                className={`w-[24%] sm:w-full sm:mb-2 shrink-0 cursor-pointer rounded-xl border-2 transition-all duration-300 ${
                  image === item ? "border-[#e94560] shadow-lg" : "border-transparent hover:border-gray-300"
                }`}
                src={backendUrl + '/uploads/' + item}
                alt="product"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto rounded-3xl shadow-lg"
              src={backendUrl + '/uploads/' + image}
              alt="main_product"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="playfair text-3xl text-gray-900 mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-3">
            <img className="w-4" src={assets.star_icon} alt="" />
            <img className="w-4" src={assets.star_icon} alt="" />
            <img className="w-4" src={assets.star_icon} alt="" />
            <img className="w-4" src={assets.star_icon} alt="" />
            <img className="w-4" src={assets.star_dull_icon} alt="" />
            <p className="pl-2 text-gray-400 text-sm">(122 reviews)</p>
          </div>
          <p className="mt-6 text-4xl font-bold gradient-text">
            {currency}{productData.price}
          </p>
          <p className="mt-5 text-gray-500 leading-relaxed md:w-4/5">
            {productData.description}
          </p>

          <div className="flex flex-col gap-4 my-8">
            <p className="font-semibold text-gray-800">Select Size</p>
            <div className="flex gap-3">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`py-2.5 px-5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    item === size
                      ? "bg-gradient-to-r from-[#e94560] to-[#f5a623] text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="shimmer-btn text-white font-semibold px-10 py-3.5 rounded-full text-sm tracking-wide hover:scale-105 active:scale-95 transition-transform duration-300"
          >
            ADD TO CART
          </button>
          <div className="mt-8 glass-card rounded-2xl p-5">
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                100% Original product
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Cash on delivery is available
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f5a623]"></span>
                Easy return and exchange within 7 days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Description / Reviews tabs */}
      <div className="mt-20">
        <div className="flex">
          <b className="px-6 py-3 text-sm bg-gradient-to-r from-[#e94560] to-[#f5a623] text-white rounded-t-xl">Description</b>
          <p className="px-6 py-3 text-sm text-gray-500 bg-gray-100 rounded-t-xl cursor-pointer hover:bg-gray-200 transition-colors">Reviews (122)</p>
        </div>
        <div className="glass-card rounded-b-2xl rounded-tr-2xl p-6 text-sm text-gray-500 leading-relaxed">
          <p>An e-commerce website is an online platform...</p>
        </div>
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;

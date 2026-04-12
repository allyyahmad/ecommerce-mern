import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, backendUrl } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="pt-14 fade-in-up">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div className="flex flex-col gap-4">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="glass-card rounded-2xl p-4 sm:p-6 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-center gap-5">
                <img
                  className="w-16 sm:w-20 rounded-xl"
                  src={backendUrl + '/uploads/' + productData.image[0]}
                  alt={productData.name}
                />
                <div>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-[#e94560] font-bold">
                      {currency}{productData.price}
                    </p>
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>
              <input
                className="border border-gray-200 rounded-xl max-w-12 sm:max-w-20 px-2 py-2 text-center focus:outline-none focus:ring-2 focus:ring-[#e94560]/20"
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
              />
              <img
                className="w-5 cursor-pointer opacity-50 hover:opacity-100 hover:scale-110 transition-all"
                src={assets.bin_icon}
                alt="delete"
                onClick={() => updateQuantity(item._id, item.size, 0)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-16">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end mt-6">
            <button
              onClick={() => navigate("/place-order")}
              className="shimmer-btn text-white font-semibold px-10 py-3.5 rounded-full text-sm tracking-wide hover:scale-105 transition-transform duration-300"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

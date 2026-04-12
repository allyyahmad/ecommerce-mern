import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full glass-card rounded-2xl p-6">
      <div className="text-2xl mb-4">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <p>Subtotal</p>
          <p className="font-medium">{currency}{getCartAmount()}.00</p>
        </div>
        <div className="h-px bg-gray-200"></div>
        <div className="flex justify-between text-gray-600">
          <p>Shipping Fee</p>
          <p className="font-medium">{currency}{deliveryFee}.00</p>
        </div>
        <div className="h-px bg-gray-200"></div>
        <div className="flex justify-between text-gray-900 text-base">
          <b>Total</b>
          <b className="gradient-text text-lg">
            {currency}{getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

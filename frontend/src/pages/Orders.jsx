import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["date"] = order.date;
            item["paymentMethod"] = order.paymentMethod;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="pt-16 fade-in-up">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="flex flex-col gap-4">
        {orderData.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-5 text-sm">
              <img className="w-16 sm:w-20 rounded-xl" src={item.image[0]} alt="" />
              <div>
                <p className="font-semibold text-gray-800 text-base">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-gray-500">
                  <p className="text-[#e94560] font-bold">{currency}{item.price}</p>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <p>Qty: {item.quantity}</p>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-2 text-gray-400 text-xs">
                  {new Date(item.date).toDateString()} &bull; {item.paymentMethod}
                </p>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
                <p className="text-sm font-medium text-gray-700">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border border-gray-200 px-5 py-2 text-sm font-medium rounded-xl hover:bg-gray-50 hover:border-[#e94560] hover:text-[#e94560] transition-all duration-300"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

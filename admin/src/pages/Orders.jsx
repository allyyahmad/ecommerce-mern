import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Orders</h2>
      <p className="text-gray-400 text-sm mb-6">Track and manage customer orders</p>

      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            className="glass-card rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-5 items-start text-sm hover:shadow-lg transition-all duration-300"
            key={index}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e94560]/10 to-[#f5a623]/10 flex items-center justify-center">
              <img className="w-6" src={assets.parcel_icon} alt="parcel" />
            </div>
            <div>
              <div className="text-gray-700">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span className="text-gray-400">({item.size})</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span className="text-gray-400">({item.size})</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-1 font-semibold text-gray-900">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="text-gray-400 text-xs">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                </p>
              </div>
              <p className="text-gray-400 text-xs mt-1">{order.address.phone}</p>
            </div>
            <div className="text-gray-500">
              <p>Items: <span className="font-semibold text-gray-700">{order.items.length}</span></p>
              <p className="mt-2">Method: <span className="font-medium">{order.paymentMethod}</span></p>
              <p>Payment: <span className={`font-semibold ${order.payment ? "text-green-500" : "text-amber-500"}`}>{order.payment ? "Done" : "Pending"}</span></p>
              <p className="text-xs text-gray-400 mt-1">{new Date(order.date).toLocaleString()}</p>
            </div>
            <p className="text-lg font-bold gradient-text">
              {currency}{order.amount}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="px-3 py-2.5 bg-gray-50 text-sm font-medium rounded-xl"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

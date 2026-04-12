import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">All Products</h2>
      <p className="text-gray-400 text-sm mb-6">Manage your product inventory</p>

      <div className="flex flex-col gap-3">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-5 bg-gradient-to-r from-gray-50 to-white rounded-xl text-sm font-semibold text-gray-500">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="glass-card rounded-xl grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-3 px-5 text-sm hover:shadow-lg transition-all duration-300"
          >
            <img
              className="w-14 h-14 rounded-lg object-cover"
              src={backendUrl + '/uploads/' + item.image[0]}
              alt={item.name}
            />
            <p className="font-medium text-gray-800">{item.name}</p>
            <p>
              <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-medium">{item.category}</span>
            </p>
            <p className="font-bold text-gray-900">
              {currency}{item.price}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => removeProduct(item._id)}
                className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors duration-300 font-bold text-sm"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

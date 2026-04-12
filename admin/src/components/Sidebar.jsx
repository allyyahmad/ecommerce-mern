import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[220px] min-h-screen bg-white border-r border-gray-100 shadow-sm">
      <div className="flex flex-col gap-2 pt-8 px-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Menu</p>
        <NavLink
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-300 text-sm font-medium"
          to={"/add"}
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <img className="w-4 h-4" src={assets.add_icon} alt="add" />
          </div>
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-300 text-sm font-medium"
          to={"/list"}
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <img className="w-4 h-4" src={assets.order_icon} alt="list" />
          </div>
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-300 text-sm font-medium"
          to={"/orders"}
        >
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <img className="w-4 h-4" src={assets.order_icon} alt="orders" />
          </div>
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

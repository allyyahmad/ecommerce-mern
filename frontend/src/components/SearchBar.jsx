import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, showSearch, setSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="bg-white border-b border-gray-100 text-center py-4">
      <div className="inline-flex items-center justify-center bg-gray-50 border border-gray-200 px-6 py-3 rounded-2xl w-3/4 sm:w-1/2 shadow-sm">
        <input
          className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400"
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-4 opacity-50" src={assets.search_icon} alt="search" />
      </div>
      <img
        className="inline w-3.5 ml-3 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        alt="close"
      />
    </div>
  ) : null;
};

export default SearchBar;

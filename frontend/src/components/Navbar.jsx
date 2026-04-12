import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = async () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between py-4 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e94560] to-[#f5a623] flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">FOREVER</span>
        </Link>
        <ul className="hidden sm:flex gap-8 text-sm font-medium text-gray-600">
          <NavLink to="/" className="flex flex-col items-center gap-1 group">
            <p className="group-hover:text-[#e94560] transition-colors duration-300">HOME</p>
            <hr className="w-0 group-hover:w-full border-none h-[2px] bg-gradient-to-r from-[#e94560] to-[#f5a623] transition-all duration-300 hidden" />
          </NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1 group">
            <p className="group-hover:text-[#e94560] transition-colors duration-300">COLLECTION</p>
            <hr className="w-0 group-hover:w-full border-none h-[2px] bg-gradient-to-r from-[#e94560] to-[#f5a623] transition-all duration-300 hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1 group">
            <p className="group-hover:text-[#e94560] transition-colors duration-300">ABOUT</p>
            <hr className="w-0 group-hover:w-full border-none h-[2px] bg-gradient-to-r from-[#e94560] to-[#f5a623] transition-all duration-300 hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1 group">
            <p className="group-hover:text-[#e94560] transition-colors duration-300">CONTACT</p>
            <hr className="w-0 group-hover:w-full border-none h-[2px] bg-gradient-to-r from-[#e94560] to-[#f5a623] transition-all duration-300 hidden" />
          </NavLink>
        </ul>
        <div className="flex items-center gap-5">
          <div
            onClick={() => setShowSearch(true)}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer transition-colors duration-300"
          >
            <img src={assets.search_icon} className="w-4" alt="search" />
          </div>
          <div className="group relative">
            <div
              onClick={() => (token ? null : navigate("/login"))}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer transition-colors duration-300"
            >
              <img src={assets.profile_icon} className="w-4" alt="profile" />
            </div>
            {token && (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-1 w-40 py-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:bg-gray-50 px-4 py-2 text-sm text-gray-600 hover:text-[#e94560] transition-colors"
                  >
                    My Orders
                  </p>
                  <p onClick={logout} className="cursor-pointer hover:bg-red-50 px-4 py-2 text-sm text-gray-600 hover:text-red-500 transition-colors">
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <div className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer transition-colors duration-300">
              <img src={assets.cart_icon} className="w-4" alt="cart" />
            </div>
            <span className="absolute -top-1 -right-1 w-5 h-5 text-center leading-5 bg-gradient-to-r from-[#e94560] to-[#f5a623] text-white rounded-full text-[10px] font-bold">
              {getCartCount()}
            </span>
          </Link>
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon}
            className="w-5 cursor-pointer sm:hidden"
            alt="menu"
          />
        </div>
      </div>
      {/* Mobile sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden bg-white/95 backdrop-blur-xl transition-all duration-500 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 p-6">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 mb-8 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="back" />
            <p className="font-medium">Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-3 px-4 rounded-lg hover:bg-gray-50 text-lg font-medium" to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 px-4 rounded-lg hover:bg-gray-50 text-lg font-medium" to="/collection">
            COLLECTION
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 px-4 rounded-lg hover:bg-gray-50 text-lg font-medium" to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 px-4 rounded-lg hover:bg-gray-50 text-lg font-medium" to="/contact">
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

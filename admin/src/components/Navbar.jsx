import React from "react";

const Navbar = ({ setToken }) => {
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="flex items-center py-3 px-6 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e94560] to-[#f5a623] flex items-center justify-center">
            <span className="text-white font-bold text-base">F</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">FOREVER</span>
          <span className="ml-2 px-2.5 py-0.5 bg-gradient-to-r from-[#e94560]/10 to-[#f5a623]/10 text-[#e94560] text-xs font-semibold rounded-full">Admin</span>
        </div>
        <button
          onClick={() => setToken("")}
          className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

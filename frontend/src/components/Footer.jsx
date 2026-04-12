import React from "react";

const Footer = () => {
  return (
    <div className="mt-20">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-t-3xl px-8 sm:px-16 pt-16 pb-8">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e94560] to-[#f5a623] flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">FOREVER</span>
            </div>
            <p className="w-full md:w-2/3 text-gray-400 text-sm leading-relaxed">
              Your destination for premium fashion. We curate the finest pieces from around the world, bringing you quality, style, and comfort in every thread.
            </p>
            <div className="flex gap-4 mt-6">
              <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#e94560] flex items-center justify-center cursor-pointer transition-all duration-300">
                <span className="text-white text-sm">IG</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#e94560] flex items-center justify-center cursor-pointer transition-all duration-300">
                <span className="text-white text-sm">TW</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#e94560] flex items-center justify-center cursor-pointer transition-all duration-300">
                <span className="text-white text-sm">FB</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold mb-5 text-white">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm">
              <li className="hover:text-[#f5a623] cursor-pointer transition-colors">Home</li>
              <li className="hover:text-[#f5a623] cursor-pointer transition-colors">About us</li>
              <li className="hover:text-[#f5a623] cursor-pointer transition-colors">Delivery</li>
              <li className="hover:text-[#f5a623] cursor-pointer transition-colors">Privacy policy</li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-semibold mb-5 text-white">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm">
              <li>+92-311-123-4567</li>
              <li>foreverclothing@gmail.com</li>
              <li className="cursor-pointer hover:text-[#f5a623] transition-colors">Instagram</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6">
          <p className="text-sm text-center text-gray-500">
            Copyright 2026 &copy; Forever Clothing. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

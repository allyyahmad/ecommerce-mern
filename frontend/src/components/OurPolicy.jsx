import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-8 sm:gap-4 text-center py-20">
      <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e94560]/10 to-[#f5a623]/10 flex items-center justify-center">
          <img className="w-8" src={assets.exchange_icon} alt="exchange" />
        </div>
        <p className="font-semibold text-gray-800">Easy Exchange Policy</p>
        <p className="text-gray-400 text-sm">We offer hassle free exchange policy</p>
      </div>
      <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e94560]/10 to-[#f5a623]/10 flex items-center justify-center">
          <img className="w-8" src={assets.quality_icon} alt="quality" />
        </div>
        <p className="font-semibold text-gray-800">7 Days Return Policy</p>
        <p className="text-gray-400 text-sm">We provide 7 days free return policy</p>
      </div>
      <div className="glass-card rounded-2xl p-8 flex flex-col items-center gap-4 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e94560]/10 to-[#f5a623]/10 flex items-center justify-center">
          <img className="w-8" src={assets.support_img} alt="support" />
        </div>
        <p className="font-semibold text-gray-800">Best Customer Support</p>
        <p className="text-gray-400 text-sm">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;

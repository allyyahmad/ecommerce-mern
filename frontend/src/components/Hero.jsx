import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl my-6 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] min-h-[500px] flex items-center">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#e94560]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f5a623]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center w-full px-8 sm:px-16 py-12">
        {/* Hero left side */}
        <div className="w-full sm:w-1/2 flex flex-col gap-6 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[2px] bg-[#f5a623]"></div>
            <p className="text-[#f5a623] font-medium text-sm tracking-[3px] uppercase">New Season 2026</p>
          </div>
          <h1 className="playfair text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            Discover Your <br />
            <span className="gradient-text">Perfect Style</span>
          </h1>
          <p className="text-gray-400 text-base max-w-md">
            Explore our curated collection of premium fashion pieces designed to elevate your everyday look.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <button className="shimmer-btn text-white font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide hover:scale-105 transition-transform duration-300">
              SHOP NOW
            </button>
            <button className="border border-white/30 text-white px-8 py-3.5 rounded-full text-sm tracking-wide hover:bg-white/10 transition-all duration-300">
              EXPLORE
            </button>
          </div>
          {/* Stats */}
          <div className="flex gap-8 mt-6">
            <div>
              <p className="text-2xl font-bold text-white">200+</p>
              <p className="text-gray-500 text-xs">Premium Brands</p>
            </div>
            <div className="w-px bg-gray-700"></div>
            <div>
              <p className="text-2xl font-bold text-white">15K+</p>
              <p className="text-gray-500 text-xs">Happy Customers</p>
            </div>
            <div className="w-px bg-gray-700"></div>
            <div>
              <p className="text-2xl font-bold text-white">30+</p>
              <p className="text-gray-500 text-xs">Store Locations</p>
            </div>
          </div>
        </div>
        {/* Hero right side */}
        <div className="w-full sm:w-1/2 mt-10 sm:mt-0 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e94560]/30 to-[#f5a623]/30 rounded-3xl blur-2xl scale-95"></div>
            <img
              className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl float-animation"
              src={assets.hero_img}
              alt="hero"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

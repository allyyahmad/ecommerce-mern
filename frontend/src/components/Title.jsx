import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-3 items-center mb-3">
      <p className="text-gray-400 font-light tracking-wide">
        {text1} <span className="gradient-text font-semibold">{text2}</span>
      </p>
      <div className="w-10 sm:w-14 h-[2px] bg-gradient-to-r from-[#e94560] to-[#f5a623] rounded-full"></div>
    </div>
  );
};

export default Title;

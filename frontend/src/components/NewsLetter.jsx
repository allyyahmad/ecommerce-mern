import React from "react";

const NewsLetter = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-12 sm:p-16 text-center my-16">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#e94560]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f5a623]/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <p className="text-3xl sm:text-4xl font-bold text-white playfair">
          Get <span className="gradient-text">20% Off</span> Your First Order
        </p>
        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and style tips.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="w-full sm:w-2/3 lg:w-1/2 flex items-center mx-auto mt-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 p-1.5"
        >
          <input
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-5 py-3 text-sm"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <button
            type="submit"
            className="shimmer-btn text-white text-sm font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;

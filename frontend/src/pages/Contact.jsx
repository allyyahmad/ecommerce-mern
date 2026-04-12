import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <div className="fade-in-up">
      <div className="text-center text-2xl pt-10">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px] rounded-3xl shadow-lg"
          src={assets.contact_img}
          alt="contact"
        />
        <div className="flex flex-col justify-center items-start gap-8">
          <div className="glass-card rounded-2xl p-8 w-full">
            <p className="font-semibold text-xl text-gray-800 playfair mb-4">Our Store</p>
            <p className="text-gray-500 leading-relaxed">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-gray-500">
                Tel: <span className="text-[#e94560] font-medium">(415) 555-0132</span>
              </p>
              <p className="text-gray-500 mt-1">
                Email: <span className="text-[#e94560] font-medium">admin@forever.com</span>
              </p>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-8 w-full">
            <p className="font-semibold text-xl text-gray-800 playfair mb-3">
              Careers at Forever
            </p>
            <p className="text-gray-500 mb-4">
              Learn more about our teams and job openings.
            </p>
            <button className="shimmer-btn text-white font-semibold px-8 py-3 rounded-full text-sm hover:scale-105 transition-transform duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

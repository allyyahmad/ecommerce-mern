import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div className="fade-in-up">
      <div className="text-2xl text-center pt-10">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] rounded-3xl shadow-lg"
          src={assets.about_img}
          alt="about"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-500 leading-relaxed">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <b className="text-gray-800 playfair text-xl">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>
      <div className="text-xl py-6">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row gap-5 mb-20">
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-4 flex-1 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e94560]/10 to-[#f5a623]/10 flex items-center justify-center">
            <span className="text-xl">&#9733;</span>
          </div>
          <b className="text-gray-800">Quality Assurance</b>
          <p className="text-gray-500 text-sm leading-relaxed">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-4 flex-1 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e94560]/10 to-[#f5a623]/10 flex items-center justify-center">
            <span className="text-xl">&#9889;</span>
          </div>
          <b className="text-gray-800">Convenience</b>
          <p className="text-gray-500 text-sm leading-relaxed">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="glass-card rounded-2xl p-8 flex flex-col gap-4 flex-1 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#e94560]/10 to-[#f5a623]/10 flex items-center justify-center">
            <span className="text-xl">&#9829;</span>
          </div>
          <b className="text-gray-800">Exceptional Customer Service</b>
          <p className="text-gray-500 text-sm leading-relaxed">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;

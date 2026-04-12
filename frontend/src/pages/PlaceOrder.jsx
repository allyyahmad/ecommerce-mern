import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { token } = useContext(ShopContext);
  const {
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item]) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const inputClasses = "border border-gray-200 rounded-xl py-3 px-4 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#e94560]/20 focus:border-[#e94560] transition-all text-sm";

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-8 pt-10 sm:pt-14 min-h-[80vh] fade-in-up"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[500px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex gap-3">
            <input required className={inputClasses} type="text" placeholder="First Name" onChange={onChangeHandler} name="firstName" value={formData.firstName} />
            <input required className={inputClasses} type="text" placeholder="Last Name" onChange={onChangeHandler} name="lastName" value={formData.lastName} />
          </div>
          <input required className={inputClasses} type="email" placeholder="Email Address" onChange={onChangeHandler} name="email" value={formData.email} />
          <input required className={inputClasses} type="text" placeholder="Street" onChange={onChangeHandler} name="street" value={formData.street} />
          <div className="flex gap-3">
            <input required className={inputClasses} type="text" placeholder="City" onChange={onChangeHandler} name="city" value={formData.city} />
            <input required className={inputClasses} type="text" placeholder="State" onChange={onChangeHandler} name="state" value={formData.state} />
          </div>
          <div className="flex gap-3">
            <input required className={inputClasses} type="number" placeholder="Zipcode" onChange={onChangeHandler} name="zipcode" value={formData.zipcode} />
            <input required className={inputClasses} type="text" placeholder="Country" onChange={onChangeHandler} name="country" value={formData.country} />
          </div>
          <input required className={inputClasses} type="number" placeholder="Phone" onChange={onChangeHandler} name="phone" value={formData.phone} />
        </div>
      </div>
      {/* Right Side */}
      <div className="mt-8 w-full sm:max-w-[420px]">
        <CartTotal />
        <div className="mt-8">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row mt-4">
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 glass-card rounded-xl p-3 px-4 cursor-pointer transition-all duration-300 ${
                method === "stripe" ? "ring-2 ring-[#e94560] shadow-lg" : "hover:shadow-md"
              }`}
            >
              <div className={`w-4 h-4 border-2 rounded-full transition-all ${method === "stripe" ? "bg-gradient-to-r from-[#e94560] to-[#f5a623] border-transparent" : "border-gray-300"}`}></div>
              <img className="h-5 mx-2" src={assets.stripe_logo} />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 glass-card rounded-xl p-3 px-4 cursor-pointer transition-all duration-300 ${
                method === "cod" ? "ring-2 ring-[#e94560] shadow-lg" : "hover:shadow-md"
              }`}
            >
              <div className={`w-4 h-4 border-2 rounded-full transition-all ${method === "cod" ? "bg-gradient-to-r from-[#e94560] to-[#f5a623] border-transparent" : "border-gray-300"}`}></div>
              <p className="text-gray-600 text-sm font-medium mx-2">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="shimmer-btn text-white font-semibold px-12 py-3.5 rounded-full text-sm tracking-wide hover:scale-105 transition-transform duration-300"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

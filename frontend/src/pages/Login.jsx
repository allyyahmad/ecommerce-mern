import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { token, navigate, backendUrl, setToken } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSumbitHandler = async (e) => {
    try {
      e.preventDefault();
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="glass-card rounded-3xl p-10 w-[90%] sm:max-w-md fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e94560] to-[#f5a623] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
          <h2 className="playfair text-3xl text-gray-900">{currentState}</h2>
          <p className="text-gray-400 text-sm mt-2">
            {currentState === "Sign Up" ? "Create your account to get started" : "Welcome back! Sign in to continue"}
          </p>
        </div>
        <form onSubmit={onSumbitHandler} className="flex flex-col gap-4">
          {currentState === "Sign Up" && (
            <input
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e94560]/20 focus:border-[#e94560] transition-all text-sm"
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          )}
          <input
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e94560]/20 focus:border-[#e94560] transition-all text-sm"
            type="text"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e94560]/20 focus:border-[#e94560] transition-all text-sm"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <div className="w-full flex justify-between text-sm text-gray-500">
            <p className="cursor-pointer hover:text-[#e94560] transition-colors">Forgot Password?</p>
            {currentState === "Sign Up" ? (
              <p onClick={() => setCurrentState("Login")} className="cursor-pointer hover:text-[#e94560] transition-colors font-medium">
                Login Here
              </p>
            ) : (
              <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer hover:text-[#e94560] transition-colors font-medium">
                Create an account
              </p>
            )}
          </div>
          <button className="w-full shimmer-btn text-white font-semibold py-3.5 rounded-full text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 mt-2">
            {currentState === "Sign Up" ? "CREATE ACCOUNT" : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router";
const Signin = () => {
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const { signin, user } = useAuthContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninData({ ...signinData, [name]: value });
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = await AuthService.login(
        signinData.email,
        signinData.password
      );

      if (currentUser.status === 200) {
        Swal.fire({
          title: "Signin Successful",
          text: currentUser?.data?.message,
          icon: "success",
        }).then(() => {});
        signin(currentUser?.data?.user);
        navigate("/");
      }
    } catch (error) {
      console.error("Signin error:", error);
    }
  };
  return (
    <div className="w-screen h-screen relative">
      <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 z-0" />
      <div className="flex items-center justify-center w-screen h-screen relative z-10">
        <div className="flex flex-col items-center w-full max-w-md px-6 py-10">
          <span className="text-6xl mb-4">🔑</span>
          <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
            Science Competition Sign In
          </h1>
          <p className="text-gray-700 text-center mb-6">
            Sign in to join the competition.
          </p>
          <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full border border-blue-200">
            <form className="w-full">
              <div className="mb-4">
                <label
                  className="block text-blue-600 font-semibold mb-1"
                  htmlFor="email "
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={signinData.email}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-blue-600 font-semibold mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={signinData.password}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow hover:scale-105 transition-transform w-full"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-500 text-center">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 underline">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

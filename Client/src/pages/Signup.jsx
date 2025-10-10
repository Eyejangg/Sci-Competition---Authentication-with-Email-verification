import { useState } from "react";
import AuthService from "../services/auth.service.js";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Signup = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    school: "",
    phone: "",
    type: "teacher",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.register(userData);

      if (currentUser.status === 201) {
        Swal.fire({
          title: "User Registration",
          text: currentUser?.data?.message,
          icon: "success",
        }).then(() => {
          setUserData({
            email: "",
            name: "",
            school: "",
            phone: "",
            type: "teacher",
            password: "",
          });
          navigate("/signin");
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        title: "Registration Failed",
        text: error.response?.data?.message || "Registration Failed!",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-screen h-screen min-h-screen relative">
      <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 z-0" />
      <div className="flex items-center justify-center w-screen h-screen relative z-10">
        <div className="flex flex-col items-center w-full max-w-md px-6 py-10">
          <span className="text-6xl mb-4">🔬</span>
          <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
            Science Competition Signup
          </h1>
          <p className="text-gray-700 text-center mb-6">
            Join the Science Competition!
            <br />
          </p>
          <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full border border-blue-200">
            <div className="mb-4 text-sm text-gray-500 text-center">
              Already have an account?{" "}
              <a href="/signin" className="text-blue-600 underline">
                Sign In
              </a>
            </div>
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-blue-600 font-semibold mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userData.name}
                  className="w-full px-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
                  placeholder="Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-blue-600 font-semibold mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={userData.email}
                  className="w-full px-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
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
                  value={userData.password}
                  className="w-full px-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-blue-600 font-semibold mb-1"
                  htmlFor="name"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={userData.phone}
                  className="w-full px-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
                  placeholder="Phone"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-blue-600 font-semibold mb-1"
                  htmlFor="email"
                >
                  School
                </label>
                <input
                  type="school"
                  name="school"
                  id="school"
                  value={userData.school}
                  className="w-full px-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
                  placeholder="School"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow hover:scale-105 transition-transform"
                >
                  🚀 Sign Up
                </button>
                <button
                  type="button"
                  className="bg-red-100 text-red-600 font-bold py-2 px-6 rounded-lg shadow hover:bg-red-200"
                  onClick={() => {
                    setUserData({
                      email: "",
                      name: "",
                      school: "",
                      phone: "",
                      type: "teacher",
                      password: "",
                    });
                    navigate("/");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

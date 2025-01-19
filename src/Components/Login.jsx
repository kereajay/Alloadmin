import React, { useContext, useState } from "react";
import { Admincontext } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Admincontext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    role: "Admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic here (e.g., send data to backend)
    const res = await fetch(
      "https://allobackend.onrender.com/api/v1/user/admin/login",
      {
        withCredentials: true,
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();

    if (data.success === true) {
      toast.success(data.message, {
        autoClose: 1200,
      });
      setIsAuthenticated(true);
      navigate("/Dashboard");
    } else {
      toast.error(data.message, {
        autoClose: 1200,
      });
    }
  };

  // if (isAuthenticated === true) {
  //   return <Navigate to={"/Dashboard"} />;
  // }

  return (
    <div className="mt-5 py-14 w-full px-4 md:w-[90%] mx-auto">
      <div className="text-center ">
        <div className="flex justify-center items-center gap-3">
          <p className="text-4xl md:text-6xl font-semibold">AJCare</p>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyzYchFowR5gM60Po2PJQNDDqgCLov1tTXlg&s"
            alt="AJCare Logo"
            // className="w-24 h-12 md:w-16 md:h-16"
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mt-4">Admin Login</h1>
        <p className="text-sm md:text-base">Only Admin can access</p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center w-full ">
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://cdn-images-1.medium.com/fit/t/1600/480/0*uyQUYlN8-imWWTdg"
            alt="Login illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 max-w-lg mx-auto p-6 md:p-10  bg-white rounded-xl shadow-[0px_20px_50px_50px_#e6fffa]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmpassword"
                className="block text-lg font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

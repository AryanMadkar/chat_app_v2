import React, { useState } from "react";
import image from "/logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Change handler for inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/chatapp/login", {
        email: loginData.email,
        password: loginData.password,
      });
      toast.success("Logged in successfully!");
      const responselocal = localStorage.setItem(
        "userinfo",
        JSON.stringify(response.data)
      );
      console.log("local response : ", responselocal);

      navigate("/");

      console.log(response.data);
    } catch (error) {
      toast.error("Failed to login. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img className="mx-auto w-48" src={image} alt="logo" />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are The Pneuma Team
                      </h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p className="mb-4 capitalize font-semibold text-xl">
                        Please login to your account
                      </p>

                      {/* Email input */}
                      <input
                        type="text"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        placeholder="Type here email"
                        className="input input-bordered input-secondary w-full max-w-xs mb-4"
                      />

                      {/* Password input */}
                      <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Type password"
                        className="input input-bordered input-secondary w-full max-w-xs mb-4"
                      />

                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-start">
                        <button
                          type="submit"
                          className="w-1/2 btn mr-2 btn-active btn-secondary"
                        >
                          Login
                        </button>
                        <a href="#!">Terms and conditions</a>
                      </div>

                      {/* Signup button */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <button
                          type="button"
                          className="btn w-1/2 btn-active btn-secondary"
                        >
                          <Link to="/register">Signup</Link>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container  ddnk1in8q */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

import React, { useState } from "react";
import image from "/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { json, Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  // Handle change for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        toast("Password does not match");
        return;
      }
      const { confirmPassword, ...dataToSubmit } = formData;
      const response = await axios.post(
        "http://localhost:5000/chatapp/register",
        dataToSubmit
      );

      if (response.status === 201) {
        toast.success("Registration successful! You can now login.");
        localStorage.setItem("userinfo", json.stringify(response.data));
        navigate("/");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while registering. Please try again.");
      }
    }
  };

  // Upload profile picture to Cloudinary and set URL to formData
  const postdetaile = async (file) => {
    try {
      if (!file || file === undefined) {
        toast("File not found");
        return;
      }
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", "chat_app");
        uploadData.append("cloud_name", "ddnk1in8q");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/ddnk1in8q/upload",
          uploadData
        );

        // Set profile picture URL in formData
        const profilePictureUrl = response.data.secure_url;
        setFormData((prevData) => ({
          ...prevData,
          profilePicture: profilePictureUrl,
        }));

        toast("File uploaded successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading file. Please try again.");
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
                        Please register an account
                      </p>

                      {/* Username input */}
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Type here name"
                        className="input input-bordered input-secondary w-full max-w-xs mb-4"
                      />

                      {/* Email input */}
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Type here email"
                        className="input input-bordered input-secondary w-full max-w-xs mb-4"
                      />

                      {/* Password input */}
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Type password"
                        className="input input-bordered input-secondary w-full max-w-xs mb-4"
                      />

                      {/* Confirm Password input */}
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        className="input input-bordered input-secondary w-full max-w-xs mb-4"
                      />

                      {/* Profile Picture input */}
                      <div>
                        <h1 className="capitalize font-semibold text-lg">
                          Upload profile picture
                        </h1>
                        <input
                          type="file"
                          onChange={(e) => {
                            postdetaile(e.target.files[0]);
                          }}
                          className="mt-2 input-secondary w-full max-w-xs mb-4"
                        />
                      </div>

                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-start">
                        <button
                          type="submit"
                          className="w-1/2 btn mr-2 btn-active btn-secondary"
                        >
                          Signup
                        </button>
                        <a href="#!">Terms and conditions</a>
                      </div>

                      {/* Login button */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Have an account?</p>
                        <button
                          type="button"
                          className="btn w-1/2 btn-active btn-secondary"
                        >
                          <Link to="/login">Login</Link>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container */}
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

export default Register;

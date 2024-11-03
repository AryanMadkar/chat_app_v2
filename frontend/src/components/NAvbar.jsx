import React, { useState, useCallback } from "react";
import logo from "/logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { useTheme } from "../context/Context";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { userinfo, handleLogout, clickeduser, setClickeduser } = useTheme();
  const [searchResults, setSearchResults] = useState();
  const navigate = useNavigate();

  const getsearch = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userinfo?.token}`,
        },
      };
      const result = await axios.get(
        `http://localhost:5000/chatapp/allusers?search=${searchQuery}`,
        config
      );
      setSearchResults(result.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        toast.error("Failed to get result");
        console.error("Failed to search", error);
      }
    }
  }, [searchQuery, userinfo?.token, setSearchResults]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleUserClick = (user) => {
    setClickeduser(user._id);
    navigate("/", { state: { user } });
  };

  const handleSearchClick = () => {
    if (searchQuery) {
      getsearch();
    } else {
      toast.info("Please enter a search term.");
    }
  };

  return (
    <div className="navbar bg-black overflow-hidden -z-10 ">
      <div className="flex-1">
        <img src={logo} alt="Logo" className="logo h-[10vh] w-auto" />
      </div>
      <div className="flex-none gap-2 relative ">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input ml-[18rem] input-bordered w-24 md:w-auto"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            document.getElementById("my_modal_2").showModal();
            handleSearchClick();
          }}
        >
          Search
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <div>
              <h3 className="font-bold text-lg capitalize">Search results</h3>
              <div className="flex flex-col gap-4 m-2 h-[45vh] overflow-auto">
                {searchResults?.length > 0 ? (
                  searchResults.map((user) => (
                    <div key={user._id} onClick={() => handleUserClick(user)}>
                      <div className="flex cursor-pointer border hover:bg-black transition-all ease-out p-2 rounded-lg mr-2 items-center gap-4">
                        <img
                          alt="User avatar"
                          className="w-8 h-8 rounded-full"
                          src={user.profilePicture}
                        />
                        <div>
                          <h4 className="font-semibold text-lg capitalize">
                            {user.name}
                          </h4>
                          <p>{user.email}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No results found.</p>
                )}
              </div>
            </div>
            <p className="py-4">Press ESC key or click outside to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <button className="btn btn-ghost btn-circle mr-20">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item p-1">
              1
            </span>
          </div>
        </button>
        <div className="dropdown dropdown-end absolute right-10 ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="User avatar" src={userinfo?.profilePicture} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              {userinfo?.name ? (
                <h1 className="justify-between">{userinfo?.name}</h1>
              ) : (
                <Loading />
              )}
            </li>
            <li>
              {userinfo?.email ? (
                <h1 className="justify-between">{userinfo?.email}</h1>
              ) : (
                <Loading />
              )}
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Navbar);

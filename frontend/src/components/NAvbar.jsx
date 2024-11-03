import React, { useEffect, useState, useCallback } from "react";
import logo from "/logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import _ from "lodash"; // Install lodash for debounce

const NAvbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    // Use lodash debounce to set the debouncedQuery
    const handler = _.debounce(() => {
      setDebouncedQuery(searchQuery);
    }, 800);

    handler();

    // Cleanup function to cancel debounce
    return () => handler.cancel();
  }, [searchQuery]);

  const getsearch = useCallback(async (query) => {
    try {
      const source = axios.CancelToken.source(); // Create a CancelToken
      const result = await axios.get("http://localhost:5000/chatapp/allusers", {
        params: { query },
        cancelToken: source.token,
      });
      console.log("Search results:", result.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error("Failed to search", error);
      }
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      getsearch(debouncedQuery);
    }
  }, [debouncedQuery, getsearch]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="navbar bg-black">
      <div className="flex-1">
        <img src={logo} alt="Logo" className="logo h-[10vh] w-auto" />
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-ghost btn-circle">
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
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NAvbar);

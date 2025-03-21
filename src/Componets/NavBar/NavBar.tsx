import React, { useState } from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import Search from "../Search/Search";
import { CompanySearchByName } from "../../FinacialModelingAPI";
import { CompanySearch } from "../../company";
import CardList from "../CardList/CardList";
import { toast } from "react-toastify";
import { PostPortfolio } from "../../Utilis/HttpService";

type Props = {};

const NavBar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>

        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center justify-between w-full px-6">
            {/* Centered & Shifted Left Search Bar */}
            <div className="flex-grow flex justify-center mr-auto">
              <Search />
            </div>

            {/* Right Section - Buttons with proper spacing */}
            <div className="flex items-center space-x-6">
              <Link
                to="/search"
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Portfolio
              </Link>
              <div className="text-gray-700">Welcome, {user?.userName}</div>
              <a
                onClick={logout}
                className="px-6 py-2 font-bold rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition duration-300"
              >
                Logout
              </a>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-gray-700">
            <Link
              to="/login"
              className="px-6 py-2 font-bold rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 font-bold rounded-lg text-white bg-green-500 hover:bg-green-600 transition duration-300"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

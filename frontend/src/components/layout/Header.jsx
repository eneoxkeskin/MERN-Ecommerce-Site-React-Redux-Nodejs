import React, { useState } from "react";
import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    logout();
    navigate(0);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  

  return (
    <div className="bg-white text-gray-800  shadow-md">
    <nav className="container mx-auto  flex flex-col md:flex-row items-center justify-between font-sans ">
      <div className="flex items-center mb-4 md:mb-0">
      <a className="navbar-brand" href="/" id="logo">
          
          EnesShop
          </a>
      </div>
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <Search />
      </div>
      <div className="flex items-center">
        <Link to="/cart" className="relative flex items-center mr-4">
          <i className="fas fa-shopping-cart text-2xl text-orange-400"></i>
          <span className="bg-white text-black rounded-full px-2 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
            {cartItems?.length}
          </span>
        </Link>
        {user ? (
          <div className="relative">
            <button
              className="flex items-center focus:outline-none"
              type="button"
              id="dropDownMenuButton"
              onClick={toggleDropdown}
              aria-expanded={dropdownOpen}
            >
              <figure className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <img
                  src={
                    user?.avatar
                      ? user?.avatar?.url
                      : "/images/default_avatar.jpg"
                  }
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </figure>
              <span>{user?.name}</span>
            </button>
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 py-2 w-48 bg-white text-black rounded-md shadow-lg"
                aria-labelledby="dropDownMenuButton"
                onClick={closeDropdown}
              >
                {user?.role === "admin" && (
                  <Link className="block px-4 py-2 hover:bg-gray-200" to="/admin/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="block px-4 py-2 hover:bg-gray-200" to="/me/orders">
                  Orders
                </Link>
                <Link className="block px-4 py-2 hover:bg-gray-200" to="/me/profile">
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          !isLoading && (
            <Link to="/login" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
    </div>
  );
};

export default Header;
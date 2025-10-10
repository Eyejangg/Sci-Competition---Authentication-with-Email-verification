import React from "react";
import { useAuthContext } from "../context/AuthContext";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const { user } = useAuthContext();
  const menuItems = [
    {
      name: "Add Restaurant",
      url: "/newRestaurant",
      roles: ["admin", "moderator"],
    },
    {
      name: "About Us",
      url: "/",
    },
  ];
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {user &&
            Array.isArray(user.authorities) &&
            user.authorities.includes("ROLES_ADMIN") && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {menuItems.map((item) => (
                  <li>
                    <a href={item.url}>{item.name}</a>
                  </li>
                ))}
              </ul>
            )}
        </div>
        <a href="/" className="btn btn-ghost text-xl">
          Grab Restaurant
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => (
            <li>
              <a href={item.url}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end space-x-2">
        {user ? (
          <div>
            <UserProfile />
          </div>
        ) : (
          <div>
            <a href="/signup" className="btn btn-soft btn-primary">
              SIGN UP
            </a>
            <a href="/signin" className="btn btn-soft btn-success ">
              SIGN IN
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

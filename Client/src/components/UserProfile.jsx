import React from "react";
import { useAuthContext } from "../context/AuthContext";
const UserProfile = () => {
  const { logout } = useAuthContext();
  const handleLogOut = () => {
    logout();
  };
  return (
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://i.pravatar.cc/150?img=12"
          />
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <a href="/profile" class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a onClick={handleLogOut}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;

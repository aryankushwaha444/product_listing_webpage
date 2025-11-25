import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 shadow bg-white dark:bg-gray-800">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        ShopApp
      </Link>

      <div className="flex gap-4">
        <Link to="/login" className="hover:text-blue-500">Login</Link>
        <Link to="/register" className="hover:text-blue-500">Register</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;

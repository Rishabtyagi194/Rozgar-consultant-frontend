import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={() => setIsMenuOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="px-4">
          <ul className="flex flex-col items-center space-y-6 mt-6">
            <li>
              <Link to="/home" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/service" onClick={() => setIsMenuOpen(false)}>
                Service
              </Link>
            </li>
            <li>
              <Link to="/jobs" onClick={() => setIsMenuOpen(false)}>
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/contactus" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 bg-[#A270FF1A] rounded-xl"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 shadow-md bg-white sticky top-0 z-30">
        <div className="flex items-center">
          <button
            className="mr-4 md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <FaBars size={24} />
          </button>

          <Link to="/home" className="font-bold text-lg">
            LOGO
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-sm">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/service">Service</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/contactus">Contact</Link></li>
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/profile"
            className="px-4 py-2 bg-[#A270FF1A] rounded-xl"
          >
            Profile
          </Link>
          <Link
            to="/contactus"
            className="px-4 py-2 bg-black text-white rounded-xl"
          >
            Contact Us
          </Link>
        </div>
      </header>

      {/* 🔥 REQUIRED FOR ROUTING */}
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;

import React, { useState } from "react";
import { FaBars, FaTimes, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeClass = "text-purple-600 font-semibold border-b-2 border-purple-600";
  const normalClass = "hover:text-purple-600 transition";

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
          <ul className="flex flex-col items-start space-y-6 mt-6 text-sm">
            <li>
              <NavLink to="/home" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
            </li>

            {/* Dropdown */}
            <li>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2"
              >
                Jobs <FaChevronDown size={12} />
              </button>
              {isDropdownOpen && (
                <ul className="ml-4 mt-3 space-y-3 text-gray-600">
                  <li>
                    <NavLink to="/job-posting" onClick={() => setIsMenuOpen(false)}>
                      Job Posting
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/internship-posting" onClick={() => setIsMenuOpen(false)}>
                      Internship Posting
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/hr-responses" onClick={() => setIsMenuOpen(false)}>
                      HR Responses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/upload-resume" onClick={() => setIsMenuOpen(false)}>
                      Upload Resume
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/my-archive" onClick={() => setIsMenuOpen(false)}>
                      My Archive
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/service" onClick={() => setIsMenuOpen(false)}>
                Service
              </NavLink>
            </li>
            <li>
              <NavLink to="/contactus" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 shadow-md bg-white sticky top-0 z-30">
        <div className="flex items-center">
          <button className="mr-4 md:hidden" onClick={() => setIsMenuOpen(true)}>
            <FaBars size={24} />
          </button>

          <NavLink to="/home" className="font-bold text-lg">
            LOGO
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-sm items-center">
            <li>
              <NavLink to="/home" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
                Home
              </NavLink>
            </li>

            {/* Dropdown */}
            <li className="relative group cursor-pointer">
              <div className="flex items-center gap-1">
                Jobs <FaChevronDown size={12} />
              </div>

              <ul className="absolute top-6 left-0 bg-white shadow-lg rounded-xl py-3 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <NavLink to="/job-posting">Job Posting</NavLink>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <NavLink to="/internship-posting">Internship Posting</NavLink>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <NavLink to="/hr-responses">HR Responses</NavLink>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <NavLink to="/upload-resume">Upload Resume</NavLink>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <NavLink to="/my-archive">My Archive</NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink to="/service" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
                Service
              </NavLink>
            </li>
            <li>
              <NavLink to="/contactus" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Profile Icon */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/profile">
            <FaUserCircle size={28} className="text-gray-700 hover:text-purple-600 transition" />
          </NavLink>
        </div>
      </header>

      {/* REQUIRED FOR ROUTING */}
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;

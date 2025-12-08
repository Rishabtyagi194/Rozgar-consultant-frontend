"use client";

import React, { useState, useEffect } from "react";
import { FiHome, FiSettings, FiMenu } from "react-icons/fi";
import { useNavigate, Outlet } from "react-router-dom";

/* -----------------------------------
   DaisyUI THEME DROPDOWN COMPONENT
------------------------------------ */
const themes = ["light", "dark", "cupcake"];

function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <select
      className="select select-sm bg-base-100 border border-base-300"
      value={theme}
      onChange={(e) => changeTheme(e.target.value)}
    >
      {themes.map((t) => (
        <option key={t} value={t}>
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </option>
      ))}
    </select>
  );
}

/* -----------------------------------
   MAIN SIDEBAR LAYOUT
------------------------------------ */
export default function SidebarLayout() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  /* Load saved theme on refresh */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="flex h-screen bg-base-200 text-base-content">

      {/* SIDEBAR */}
      <div
        className={`fixed lg:static top-0 left-0 h-full bg-base-100 shadow-lg transition-all duration-300 z-50
          ${open ? "w-64" : "w-0 lg:w-64"}
          ${collapsed ? "lg:w-16" : "lg:w-64"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          {!collapsed && <h1 className="font-bold text-lg">Dashboard</h1>}

          {/* Collapse (Desktop) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:block p-2 text-base-content hover:bg-base-200 rounded"
          >
            <FiMenu size={20} />
          </button>

          {/* Close (Mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-2 text-base-content hover:bg-base-200 rounded"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Navigation */}
        <ul className="mt-4">

          {/* HOME */}
          <li>
            <button
              onClick={() => navigate("/home")}
              className="flex items-center gap-4 w-full px-4 py-3 hover:bg-base-200 transition group relative"
            >
              <FiHome size={20} />
              {!collapsed && <span>Homepage</span>}

              {/* Tooltip in collapsed mode */}
              {collapsed && (
                <span className="absolute left-16 bg-neutral text-neutral-content px-2 py-1 rounded opacity-0 group-hover:opacity-100 text-xs">
                  Homepage
                </span>
              )}
            </button>
          </li>

          {/* SETTINGS */}
          <li>
            <button
              onClick={() => navigate("/settings")}
              className="flex items-center gap-4 w-full px-4 py-3 hover:bg-base-200 transition group relative"
            >
              <FiSettings size={20} />
              {!collapsed && <span>Settings</span>}

              {collapsed && (
                <span className="absolute left-16 bg-neutral text-neutral-content px-2 py-1 rounded opacity-0 group-hover:opacity-100 text-xs">
                  Settings
                </span>
              )}
            </button>
          </li>

        </ul>
      </div>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <nav className="w-full bg-base-100 px-4 py-3 shadow flex items-center justify-between border-b border-base-300">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded hover:bg-base-200"
            >
              <FiMenu size={22} />
            </button>

            <h2 className="text-lg font-semibold">Navbar Title</h2>
          </div>

          {/* ⭐ THEME TOGGLE DROPDOWN */}
          <ThemeToggle />
        </nav>

        {/* PAGE CONTENT (Dynamic) */}
        <div className="p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

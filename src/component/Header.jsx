import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

import {
  FaSearch,
  FaTimes,
  FaBars,
  FaChevronDown,
} from "react-icons/fa";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showTools, setShowTools] = useState(false);

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenu]);

  const linkClass = ({ isActive }) =>
    `uppercase text-sm tracking-[2px] font-semibold transition ${
      isActive
        ? "text-[#8C5631]"
        : "text-[#4E2D20] hover:text-[#B77466]"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E8D8C8]">

        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/">
            <img
              src={logo}
              alt="Cozykie"
              className="w-16 sm:w-20 object-contain"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-12">

            <NavLink to="/" end className={linkClass}>
              Recipes
            </NavLink>

            <NavLink to="/collection" className={linkClass}>
              Collection
            </NavLink>

            <NavLink to="/journal" className={linkClass}>
              Journal
            </NavLink>

            {/* Tools Dropdown */}
            <div className="relative">

              <button
                onClick={() => setShowTools(!showTools)}
                className="flex items-center gap-2 uppercase text-sm tracking-[2px] font-semibold text-[#4E2D20] hover:text-[#B77466]"
              >
                Tools

                <FaChevronDown
                  className={`text-xs transition-transform duration-300 ${
                    showTools ? "rotate-180" : ""
                  }`}
                />

              </button>

              {showTools && (

                <div className="absolute top-full left-0 w-60 mt-5 bg-[#EFE9E3] shadow-xl py-3 z-50">

                  <NavLink
                    to="/tools/recipe-scaler"
                    onClick={() => setShowTools(false)}
                    className="block px-6 py-3 text-[#4E2D20] hover:text-[#B77466]"
                  >
                    Recipe Scaler
                  </NavLink>

                  <NavLink
                    to="/tools/measurement-converter"
                    onClick={() => setShowTools(false)}
                    className="block px-6 py-3 text-[#4E2D20] hover:text-[#B77466]"
                  >
                    Measurement Converter
                  </NavLink>

                  <NavLink
                    to="/tools/pantry-substitutions"
                    onClick={() => setShowTools(false)}
                    className="block px-6 py-3 text-[#4E2D20] hover:text-[#B77466]"
                  >
                    Pantry Substitutions
                  </NavLink>

                </div>

              )}

            </div>

            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>

          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">

            {!showSearch ? (

              <button
                onClick={() => setShowSearch(true)}
                className="w-11 h-11 flex items-center justify-center"
              >
                <FaSearch className="text-[#4E2D20]" />
              </button>

            ) : (

              <div className="flex items-center w-72 bg-white rounded-full border border-[#E8D8C8] px-4 py-2">

                <FaSearch className="text-gray-400" />

                <input
                  autoFocus
                  placeholder="Search recipes..."
                  className="flex-1 bg-transparent outline-none px-3 text-sm"
                />

                <button onClick={() => setShowSearch(false)}>
                  <FaTimes />
                </button>

              </div>

            )}

            <button className="bg-[#4E2D20] hover:bg-[#8C5631] text-white rounded-full px-6 py-2 font-semibold transition">
              Get Started
            </button>

          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMobileMenu(true)}
            className="lg:hidden text-2xl text-[#4E2D20]"
          >
            <FaBars />
          </button>

        </div>

      </header>

      {/* Overlay */}

      <div
        onClick={() => setMobileMenu(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 lg:hidden
        ${
          mobileMenu
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}

      <aside
        className={`fixed top-0 right-0 h-screen w-80 max-w-[85vw]
        bg-[#F9F8F6] shadow-2xl z-50
        transition-transform duration-300 ease-in-out
        ${
          mobileMenu
            ? "translate-x-0"
            : "translate-x-full"
        }
        lg:hidden`}
      >

        {/* Header */}

        <div className="flex items-center px-6 py-5">

          <button
            onClick={() => setMobileMenu(false)}
            className="text-2xl text-[#4E2D20]"
          >
            <FaTimes />
          </button>

        </div>

        {/* Links */}

        <nav className="flex flex-col py-4">

          <NavLink
            to="/"
            onClick={() => setMobileMenu(false)}
            className="px-6 py-4 hover:bg-[#F4ECE4]"
          >
            Recipes
          </NavLink>

          <NavLink
            to="/collection"
            onClick={() => setMobileMenu(false)}
            className="px-6 py-4 hover:bg-[#F4ECE4]"
          >
            Collection
          </NavLink>

          <NavLink
            to="/journal"
            onClick={() => setMobileMenu(false)}
            className="px-6 py-4 hover:bg-[#F4ECE4]"
          >
            Journal
          </NavLink>

          <NavLink
            to="/tools"
            onClick={() => setMobileMenu(false)}
            className="px-6 py-4 hover:bg-[#F4ECE4]"
          >
            Tools
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setMobileMenu(false)}
            className="px-6 py-4 hover:bg-[#F4ECE4]"
          >
            About
          </NavLink>

          <div className="p-6">

            <div className="flex items-center bg-white rounded-full border border-[#E8D8C8] px-4 py-3">

              <FaSearch className="text-gray-400" />

              <input
                placeholder="Search..."
                className="flex-1 bg-transparent outline-none px-3 text-sm"
              />

            </div>

            <button className="mt-5 w-full rounded-full bg-[#4E2D20] hover:bg-[#8C5631] text-white py-3 font-semibold transition">
              Get Started
            </button>

          </div>

        </nav>

      </aside>
    </>
  );
};

export default Header;
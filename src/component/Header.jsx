import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

import {
  FaSearch,
  FaTimes,
  FaBars,
  FaChevronDown,
} from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate()
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
        ? "text-accent"
        : "text-primary hover:text-hover"
    }`;


    const dropdownLinkClass = ({ isActive }) =>
  `block px-6 py-3 transition ${
    isActive
      ? "text-accent font-semibold"
      : "text-primary hover:text-hover"
  }`;






  return (
    <>
      <header className="sticky top-0 z-50 bg-light-bg/95 backdrop-blur-md border-b border-border">

        <div className="px-32 py-4 flex items-center justify-between">

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
                className="flex items-center gap-2 uppercase text-sm tracking-[2px] font-semibold text-primary hover:text-hover"
              >
                Tools

                <FaChevronDown
                  className={`text-xs transition-transform duration-300 ${
                    showTools ? "rotate-180" : ""
                  }`}
                />

              </button>

              {showTools && (

                <div className="absolute top-full left-0 w-60 mt-5 bg-light-bg/95 shadow-xl py-3 z-50">

                  <NavLink
                    to="/tools/scaler"
                    onClick={() => setShowTools(false)}
                    className={dropdownLinkClass}
                  >
                    Recipe Scaler
                  </NavLink>

                  <NavLink
                    to="/tools/converter"
                    onClick={() => setShowTools(false)}
                    className={dropdownLinkClass}
                  >
                    Measurement Converter
                  </NavLink>

                  <NavLink
                    to="/tools/substitution"
                    onClick={() => setShowTools(false)}
                    className={dropdownLinkClass}
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
                <FaSearch className="text-primary" />
              </button>

            ) : (

              <div className="flex items-center w-72 bg-white rounded-full border border-border px-4 py-2">

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

            <button onClick={() => navigate('/create')} className="bg-primary hover:bg-accent text-white rounded-full px-6 py-2 font-semibold transition">
              Get Started
            </button>

          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMobileMenu(true)}
            className="lg:hidden text-2xl text-primary"
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
        bg-light-bg shadow-2xl z-50
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
            className="text-2xl text-primary"
          >
            <FaTimes />
          </button>

        </div>

        {/* Links */}

        <nav className="flex flex-col py-4">

          <NavLink
            to="/"
            onClick={() => setMobileMenu(false)}
            className="px-6 py-4 hover:bg-hover"
          >
            Recipes
          </NavLink>

          <NavLink
            to="/collection"
            onClick={() => setMobileMenu(false)}
            className="px-6 py-4 "
          >
            Collection
          </NavLink>

          <NavLink
            to="/journal"
            onClick={() => setMobileMenu(false)}
            className="px-6 py-4 hover:bg-hover"
          >
            Journal
          </NavLink>

          <NavLink
            to="/tools"
            onClick={() => setMobileMenu(false)}
            className="px-6 py-4 hover:bg-hover"
          >
            Tools
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setMobileMenu(false)}
            className="px-6 py-4 hover:bg-hover"
          >
            About
          </NavLink>

          <div className="p-6">

            <div className="flex items-center bg-white rounded-full border border-border px-4 py-3">

              <FaSearch className="text-gray-400" />

              <input
                placeholder="Search..."
                className="flex-1 bg-transparent outline-none px-3 text-sm"
              />

            </div>

            <button className="mt-5 w-full rounded-full bg-primary hover:bg-hover text-white py-3 font-semibold transition">
              Get Started
            </button>

          </div>

        </nav>

      </aside>
    </>
  );
};

export default Header;
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/images/logo.png";
import { logout as logoutAction } from "../redux/actions/auth.actions";

import {
  FaSearch,
  FaTimes,
  FaBars,
  FaChevronDown,
  FaUser,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ConfirmDialog from "../component/ConfirmDialog";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const user = useSelector((state) => state.auth.user);

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

  const handleLogout = () => {
    dispatch(logoutAction());
    setShowProfile(false);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `uppercase text-sm tracking-[2px] font-semibold transition ${
      isActive ? "text-accent" : "text-primary hover:text-hover"
    }`;

  const dropdownLinkClass = ({ isActive }) =>
    `block px-6 py-3 transition ${
      isActive ? "text-accent font-semibold" : "text-primary hover:text-hover"
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-light-bg/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">

          {/* Logo */}
          <NavLink to="/">
            <img
              src={logo}
              alt="Cozykie"
              className="w-16 object-contain sm:w-20"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex xl:gap-10 2xl:gap-12">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>

            <NavLink to="/collections" className={linkClass}>
              Collection
            </NavLink>

            <NavLink to="/recipes" className={linkClass}>
              Recipes
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
                <div className="absolute left-0 top-full z-50 mt-5 w-60 bg-light-bg/95 py-3 shadow-xl">
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
          <div className="hidden items-center gap-3 lg:flex xl:gap-4">
            {/* Search */}
            {!showSearch ? (
              <button
                onClick={() => setShowSearch(true)}
                className="flex h-11 w-11 items-center justify-center"
              >
                <FaSearch className="text-primary" />
              </button>
            ) : (
              <div className="flex w-56 items-center rounded-full border border-border bg-white px-4 py-2 xl:w-72">
                <FaSearch className="text-gray-400" />
                <input
                  autoFocus
                  placeholder="Search recipes..."
                  className="flex-1 bg-transparent px-3 text-sm outline-none"
                />
                <button onClick={() => setShowSearch(false)}>
                  <FaTimes />
                </button>
              </div>
            )}

            {/* Authentication */}
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="rounded-full bg-primary px-5 py-2 font-semibold text-white transition hover:bg-accent xl:px-6"
              >
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition hover:bg-accent"
                >
                  <FaUser className="text-sm" />
                </button>

                {showProfile && (
                  <div className="absolute right-0 top-full mt-4 w-48 border border-border bg-light-bg py-2 shadow-xl">
                    <div className="border-b border-border px-5 py-3">
                      <p className="text-sm font-semibold text-primary">
                        {user.name || "Baker"}
                      </p>
                      <p className="mt-1 truncate text-xs text-text">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full px-5 py-3 text-left text-sm text-primary transition hover:bg-hover"
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => navigate("/favourite")}
                      className="w-full px-5 py-3 text-left text-sm text-primary transition hover:bg-hover"
                    >
                      Favourites
                    </button>

                    <button
                      onClick={() => navigate("/journal")}
                      className="w-full px-5 py-3 text-left text-sm text-primary transition hover:bg-hover"
                    >
                      Journal
                    </button>

                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="w-full flex items-center gap-2 px-5 py-3 text-left text-sm text-primary transition hover:bg-hover"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(true)}
            className="text-2xl text-primary lg:hidden"
          >
            <FaBars />
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setMobileMenu(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-all duration-300 lg:hidden ${
          mobileMenu ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-80 max-w-[85vw] bg-light-bg shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center px-6 py-5">
          <button
            onClick={() => setMobileMenu(false)}
            className="text-2xl text-primary"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex flex-col py-4">
          <NavLink to="/recipes" onClick={() => setMobileMenu(false)} className="px-6 py-4 hover:bg-hover">
            Recipes
          </NavLink>

          <NavLink to="/collections" onClick={() => setMobileMenu(false)} className="px-6 py-4">
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
            <div className="flex items-center rounded-full border border-border bg-white px-4 py-3">
              <FaSearch className="text-gray-400" />
              <input
                placeholder="Search..."
                className="flex-1 bg-transparent px-3 text-sm outline-none"
              />
            </div>

            {!user ? (
              <button
                onClick={() => {
                  setMobileMenu(false);
                  navigate("/login");
                }}
                className="mt-5 w-full rounded-full bg-primary py-3 font-semibold text-white transition hover:bg-hover"
              >
                Get Started
              </button>
            ) : (
              <div className="mt-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    <FaUser className="text-sm" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-primary">
                      {user.name || "Baker"}
                    </p>
                    <p className="truncate text-xs text-text">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMobileMenu(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="w-full rounded-full border border-primary py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Logout confirmation — shared by both desktop and mobile triggers */}
      {showLogoutConfirm && (
        <ConfirmDialog
          title="Log Out"
          message="Are you sure you want to log out?"
          confirmLabel="Log Out"
          onConfirm={() => {
            setShowLogoutConfirm(false);
            handleLogout();
          }}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </>
  );
};

export default Header;
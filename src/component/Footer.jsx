import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo-tag.png";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  const linkClass =
    "text-sm text-primary hover:text-accent transition";

  const headerlinkClass =
    "text-lg md:text-xl font-bold text-primary mb-3";

  const link =
    "w-10 h-10 rounded-full border border-footerBrandBorder flex items-center justify-center text-primary hover:bg-primary hover:text-white transition";

  return (
    <footer className="bg-dark-bg border-t border-border">

      {/* SAME RESPONSIVE MARGIN AS HEADER */}
      <div className="px-6 py-14 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">

            <img
              src={logo}
              alt="Cozykie"
              className="w-28 sm:w-32"
            />

            <div className="mt-2 flex items-center justify-center gap-3 sm:justify-start">

              <Link to="#" className={link}>
                <FaInstagram />
              </Link>

              <Link to="#" className={link}>
                <FaPinterestP />
              </Link>

              <Link to="#" className={link}>
                <FaEnvelope />
              </Link>

              <Link to="#" className={link}>
                <FaLinkedinIn />
              </Link>

            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className={headerlinkClass}>
              Explore
            </h4>

            <ul className="flex flex-col gap-3">
              <li>
                <NavLink to="/fresh" className={linkClass}>
                  Recipes
                </NavLink>
              </li>

              <li>
                <NavLink to="/recipes" className={linkClass}>
                  Collections
                </NavLink>
              </li>

              <li>
                <NavLink to="/favorites" className={linkClass}>
                  Kitchen Journal
                </NavLink>
              </li>

              <li>
                <NavLink to="/chewy-soft" className={linkClass}>
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Baking Companion */}
          <div>
            <h4 className={headerlinkClass}>
              Baking Companion
            </h4>

            <ul className="flex flex-col gap-3">
              <li>
                <NavLink
                  to="/tools/pantry-substitutions"
                  className={linkClass}
                >
                  Recipe Scaler
                </NavLink>
              </li>

              <li>
                <NavLink to="/journal" className={linkClass}>
                  Measurement Converter
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/tools/batch-scaler"
                  className={linkClass}
                >
                  Pantry Substitutions
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/tools/oven-temp-converter"
                  className={linkClass}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Stay Cozy */}
          <div className="text-center sm:text-left">

            <h4 className={headerlinkClass}>
              Stay Cozy
            </h4>

            <p className="mb-4 text-sm text-primary">
              Fresh recipes, baking tips, and cozy inspiration
              delivered to your inbox every week.
            </p>

            <form className="flex flex-col gap-3">

              <input
                type="email"
                placeholder="Your email address..."
                className="w-full rounded-full border border-primary bg-white/60 px-4 py-2.5 text-sm text-primary placeholder-primary/70 outline-none transition focus:border-accent"
              />

              <button
                type="submit"
                className="rounded-full bg-primary py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-accent"
              >
                Subscribe
              </button>

            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="
            mt-10
            flex flex-col items-center justify-between
            gap-5
            border-t border-border
            pt-6
            text-center
            md:flex-row md:text-left
          "
        >

          <p className="text-xs text-primary">
            © {new Date().getFullYear()} Cozykie Recipe Companion.
            All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:justify-end">

            <Link
              to="/primary"
              className="text-xs text-primary transition hover:text-accent"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-primary transition hover:text-accent"
            >
              Terms of Service
            </Link>

            <Link
              to="/community-guidelines"
              className="text-xs text-primary transition hover:text-accent"
            >
              Community Guidelines
            </Link>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
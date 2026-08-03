import React from "react";
import { NavLink } from "react-router-dom";
import { GiCookie } from "react-icons/gi";
import logo from "../assets/images/logo-tag.png";
import { FaEnvelope, FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa";


const Footer = () => {
  const linkClass = "text-sm text-[#4E2D20] hover:text-[#8C5631] transition";

  return (
    <footer className="bg-[#EFE9E3]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-14">

          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">

            <img
              src={logo}
              alt="Cozykie"
              className="w-28 sm:w-32"
            />

            <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#D8C3B1] flex items-center justify-center text-[#6A3F2A] hover:bg-[#6A3F2A] hover:text-white transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#D8C3B1] flex items-center justify-center text-[#6A3F2A] hover:bg-[#6A3F2A] hover:text-white transition"
              >
                <FaPinterestP />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#D8C3B1] flex items-center justify-center text-[#6A3F2A] hover:bg-[#6A3F2A] hover:text-white transition"
              >
                <FaEnvelope />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#D8C3B1] flex items-center justify-center text-[#6A3F2A] hover:bg-[#6A3F2A] hover:text-white transition"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* Recipe Library */}
          <div>
            <h4 className="font-serif text-lg md:text-xl font-bold text-[#4E2D20] mb-5">
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              <li><NavLink to="/fresh" className={linkClass}>Recipes</NavLink></li>
              <li><NavLink to="/recipes" className={linkClass}>Collections</NavLink></li>
              <li><NavLink to="/favorites" className={linkClass}>Kitchen Journal</NavLink></li>
              <li><NavLink to="/chewy-soft" className={linkClass}>About Us</NavLink></li>
            </ul>
          </div>

          {/* Baking Companion */}
          <div>
            <h4 className="font-serif text-lg font-bold text-[#4E2D20] mb-5">
              Baking Companion
            </h4>
            <ul className="flex flex-col gap-3">
              <li><NavLink to="/tools/pantry-substitutions" className={linkClass}>Recipe Scaler</NavLink></li>
              <li><NavLink to="/journal" className={linkClass}>Measurement Converter</NavLink></li>
              <li><NavLink to="/tools/batch-scaler" className={linkClass}>Pantry Substitutions</NavLink></li>
              <li><NavLink to="/tools/oven-temp-converter" className={linkClass}>Contact Us</NavLink></li>
            </ul>
          </div>

          {/* Stay Cozy */}
          <div className="text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-[#4E2D20] mb-5">
              Stay Cozy
            </h4>
            <p className="text-sm mb-4">
              Fresh recipes, baking tips, and cozy inspiration delivered to your inbox every week.           
            </p>

            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address..."
                className="w-full bg-[white]/60 border border-[#4E2D20] rounded-full px-4 py-2.5 text-sm text-[#4E2D20] placeholder-[#4E2D20]/70 outline-none focus:border-[#E0954D] transition"
              />
              <button
                type="submit"
                className="bg-[#4E2D20] hover:bg-[#8C5631] text-sm text-white  font-bold uppercase tracking-wide rounded-full py-2.5 transition"
              >
                Subscribe 
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#6B4530]
        flex flex-col md:flex-row
        items-center justify-between
        gap-5 text-center md:text-left">          
          <p className="text-xs text-[#4E2D20]">
            © {new Date().getFullYear()} Cozykie Recipe Companion. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
            <NavLink to="/privacy" className="text-xs text-[#4E2D20] hover:text-[#8C5631] transition">
              Privacy Policy
            </NavLink>
            <NavLink to="/terms" className="text-xs text-[#4E2D20] hover:text-[#8C5631] transition">
              Terms of Service
            </NavLink>
            <NavLink to="/community-guidelines" className="text-xs text-[#4E2D20] hover:text-[#8C5631] transition">
              Community Guidelines
            </NavLink>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
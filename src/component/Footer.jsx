import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GiCookie } from "react-icons/gi";
import logo from "../assets/images/logo-tag.png";
import { FaEnvelope, FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa";


const Footer = () => {
  const linkClass = "text-sm text-primary hover:text-accent transition";

  const headerlinkClass = "text-lg md:text-xl font-bold text-primary mb-3";

  const link = "w-10 h-10 rounded-full border border-footerBrandBorder flex items-center justify-center text-primary hover:bg-primary hover:text-white transition";

  return (
    <footer className="bg-dark-bg">
      <div className="px-6 sm:px-8 lg:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1fr] gap-8 lg:gap-8">

          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">

            <img
              src={logo}
              alt="Cozykie"
              className="w-28 sm:w-32"
            />

            <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">

              <Link to="#"
                className={link}
              >
                <FaInstagram />
              </Link>

              <Link to="#"
                className={link}
              >
                <FaPinterestP />
              </Link>

              <Link to="#"
                className={link}
              >
                <FaEnvelope />
              </Link>

              <Link to="#"
                className={link}
              >
                <FaLinkedinIn />
              </Link>

            </div>

          </div>

          {/* Recipe Library */}
          <div>
            <h4 className={headerlinkClass}>
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
            <h4 className={headerlinkClass}>
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
            <h4 className={headerlinkClass}>
              Stay Cozy
            </h4>
            <p className="text-sm mb-4 text-primary">
              Fresh recipes, baking tips, and cozy inspiration delivered to your inbox every week.           
            </p>

            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address..."
                className="w-full bg-[white]/60 border border-primary rounded-full px-4 py-2.5 text-sm text-primary placeholder-primary/70 outline-none focus:border-accent transition"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-accent text-sm text-white  font-bold uppercase tracking-wide rounded-full py-2.5 transition"
              >
                Subscribe 
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border
        flex flex-col md:flex-row
        items-center justify-between
        gap-5 text-center md:text-left">          
          <p className="text-xs text-primary">
            © {new Date().getFullYear()} Cozykie Recipe Companion. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
            <Link to="/primary" className="text-xs text-primary hover:text-accent transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-primary hover:text-accent transition">
              Terms of Service
            </Link>
            <Link to="/community-guidelines" className="text-xs text-primary hover:text-accent transition">
              Community Guidelines
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
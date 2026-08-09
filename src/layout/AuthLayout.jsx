import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const AuthLayout = ({ heading, children }) => {
  return (
    <section className="min-h-screen bg-dark-bg flex items-center justify-center py-14">
      {/* Card */}
      <div className="relative w-full max-w-md bg-light-bg rounded-3xl shadow-xl p-8  sm:px-12 sm:py-14 overflow-hidden">

        <div className="relative">
          {/* Logo */}
          <NavLink to="/" className="flex justify-center ">
            <img src={logo} alt="Cozykie" className="h-20 sm:h-24 w-auto" />
          </NavLink>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1
              className="text-lg sm:text-3xl font-bold text-primary mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {heading.title}
            </h1>
            <p className="text-sm text-text">{heading.desc}</p>
          </div>

          {/* Form content */}
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
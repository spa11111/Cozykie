import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const AuthLayout = ({ heading, children }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-light-bg px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
      <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:p-10">

        {/* Logo */}
        <NavLink to="/" className="flex justify-center">
          <img
            src={logo}
            alt="Cozykie"
            className="h-20 w-auto sm:h-24"
          />
        </NavLink>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1
            className="mb-2 text-2xl font-bold text-primary sm:text-3xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {heading.title}
          </h1>

          <p className="text-sm text-text sm:text-base">
            {heading.desc}
          </p>
        </div>

        {/* Form content */}
        {children}

      </div>
    </section>
  );
};

export default AuthLayout;
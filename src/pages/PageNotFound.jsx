import { NavLink } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

const PageNotFound = () => {
  return (
    <section className="min-h-screen bg-dark-bg flex items-center justify-center px-6 py-16">
      {/* Popup card */}
      <div className="relative w-full max-w-xl bg-light-bg rounded-3xl shadow-xl px-8 py-14 sm:px-14 sm:py-16 text-center overflow-hidden">

        <div className="relative">
          <span className="block text-xs uppercase tracking-[3px] font-semibold text-accent mb-4">
            Oops, wrong tray
          </span>

          <h1
            className="text-[7rem] sm:text-[9rem] leading-none font-bold text-primary"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            404
          </h1>

          <h2
            className="text-2xl sm:text-3xl font-semibold text-primary -mt-2 mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Page Not Found
          </h2>

          <p className="text-sm sm:text-base text-text max-w-sm mx-auto mb-10">
            This batch didn't make it out of the oven. The page you're looking
            for may have been moved, renamed, or never existed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <NavLink
              to="/"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-accent rounded-full px-6 py-3 hover:bg-primary transition-colors duration-300 w-full sm:w-auto"
            >
              <FiHome size={15} />
              Back to Home
            </NavLink>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary border border-primary/40 rounded-full px-6 py-3 hover:bg-accent hover:text-white transition-colors duration-300 w-full sm:w-auto"
            >
              <FiArrowLeft size={15} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
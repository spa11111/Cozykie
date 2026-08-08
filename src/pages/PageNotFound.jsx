import { NavLink } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";

const PageNotFound = () => {
  return (
    <section className="min-h-screen bg-[#EFE9E3] flex items-center justify-center px-6 py-16">
      {/* Popup card */}
      <div className="relative w-full max-w-xl bg-[#FDF6F0] rounded-3xl shadow-xl px-8 py-14 sm:px-14 sm:py-16 text-center overflow-hidden">

        {/* soft decorative blob */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#F3D6DC]/50 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-[#EFDCC3]/50 blur-2xl" />

        <div className="relative">
          <span className="block text-xs uppercase tracking-[3px] font-semibold text-[#9D6335] mb-4">
            Oops, wrong tray
          </span>

          <h1
            className="text-[7rem] sm:text-[9rem] leading-none font-bold text-[#2B1B12]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            404
          </h1>

          <h2
            className="text-2xl sm:text-3xl font-semibold text-[#3A2418] -mt-2 mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Page Not Found
          </h2>

          <p className="text-sm sm:text-base text-[#6B5A45] max-w-sm mx-auto mb-10">
            This batch didn't make it out of the oven. The page you're looking
            for may have been moved, renamed, or never existed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <NavLink
              to="/"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#9D6335] rounded-full px-6 py-3 hover:bg-[#875329] transition-colors duration-300 w-full sm:w-auto"
            >
              <FiHome size={15} />
              Back to Home
            </NavLink>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#9D6335] border border-[#9D6335]/40 rounded-full px-6 py-3 hover:bg-[#9D6335] hover:text-white transition-colors duration-300 w-full sm:w-auto"
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
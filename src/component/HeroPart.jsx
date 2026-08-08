import { NavLink } from "react-router-dom";
import recipeScaler from "../assets/images/recipe-scaler.jpg";

const HeroPart = () => {
  return (
    <section className="w-full bg-[#F4ECE4] px-6 lg:px-16 py-16 lg:py-20">
      {/* Full-width band */}
      <div className="relative w-full">
        {/* Image block occupying the right portion, with margins */}
        <div className="relative ml-auto h-[520px] w-[92%] overflow-hidden rounded-sm sm:h-[600px] md:w-[80%] lg:w-[70%]">
          <img
            src={recipeScaler}
            alt="Freshly baked cookies"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute left-[14%] top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-white/90 sm:h-14 sm:w-14" />
        </div>

        {/* Content card overlapping on the left */}
        <div className="absolute left-[4%] top-1/2 w-[520px] max-w-[80%] -translate-y-1/2 rounded-md bg-[#FFF8F2] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:p-12">
          <h1
            className="text-3xl font-bold leading-tight text-[#4E2D20] text-balance sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Cozykie brings you home-baked cookie recipes
          </h1>

          <p className="mt-6 text-sm leading-relaxed text-[#6B4A3A] sm:text-base">
            Discover, scale, and journal every batch — with tools built
            for real home bakers, not professional kitchens.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <NavLink
              to="/recipes"
              className="rounded-md bg-[#4E2D20] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3A2116]"
            >
              Browse Recipes
            </NavLink>
            <NavLink
              to="/tools"
              className="rounded-md border border-[#4E2D20] bg-white px-7 py-3 text-sm font-semibold text-[#4E2D20] transition-colors hover:bg-[#4E2D20] hover:text-white"
            >
              Explore Tools
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPart;    
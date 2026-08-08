import { NavLink } from "react-router-dom";
import hero from "../../assets/images/hero.jpg";

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[560px] w-full overflow-hidden">
      {/* Background image */}
      <img
        src={hero}
        alt="Freshly baked cookies with warm chocolate drizzle"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10 flex items-center">
        <div className="max-w-xl">

          <span className="block text-xs uppercase tracking-[3px] font-semibold text-tag mb-4">
            Bake.Journal.Share
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Quality cookies,
            <br />
            baked with love
          </h1>                         

          {/* Underline swash */}
          <svg
            width="220"
            height="20"
            viewBox="0 0 220 20"
            fill="none"
            className="mb-6 -mt-1"
          >
            <path
              d="M2 12C40 4 90 4 130 10C160 14 190 8 218 14"
              stroke="#E8A07C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-sm leading-relaxed">
            Discover recipes, journal every batch, and share the warmth of
            home baking — one cookie at a time.
          </p>

          <NavLink
            to="/recipes"
            className="inline-flex items-center bg-accent hover:bg-primary text-white font-semibold rounded-full px-7 py-3.5 transition"
          >
            Browse Recipes
          </NavLink>

        </div>
      </div>
    </section>
  );
};

export default Hero;
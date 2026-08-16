import { NavLink } from "react-router-dom";
import hero from "../assets/images/hero.jpg";

const Hero = () => {
  return (
    <section
      className="relative h-[600px] bg-cover bg-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="max-w-xl">

          <span className="mb-4 block text-xs font-semibold uppercase tracking-[3px] text-tag">
            Bake.Journal.Share
          </span>

          <h1
            className="mb-2 text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Quality cookies,
            <br />
            baked with love
          </h1>

          {/* Underline */}
          <svg
            width="220"
            height="20"
            viewBox="0 0 220 20"
            fill="none"
            className="-mt-1 mb-6"
          >
            <path
              d="M2 12C40 4 90 4 130 10C160 14 190 8 218 14"
              stroke="#E8A07C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          <p className="mb-8 max-w-sm text-sm leading-relaxed text-white/80 sm:text-base">
            Discover recipes, journal every batch, and share the warmth of
            home baking — one cookie at a time.
          </p>

          <NavLink
            to="/recipe"
            className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 font-semibold text-white transition hover:bg-primary"
          >
            Browse Recipes
          </NavLink>

        </div>
      </div>
    </section>
  );
};

export default Hero;
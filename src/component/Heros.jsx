import { NavLink } from "react-router-dom";

const Heros = ({ heading, image, alt }) => {
  return (
    <section className="relative w-full bg-dark-bg px-6 py-10 lg:px-10">
      <div className="relative mx-auto">

        {/* Image */}
        <div className="ml-auto w-full lg:w-[72%]">
          <img
            src={image}
            alt={alt}
            className="h-[500px] w-full rounded-md object-cover"
          />
        </div>

        {/* Content card */}
        <div className="absolute left-[4%] top-1/2 w-[520px] max-w-[80%] -translate-y-1/2 rounded-2xl bg-light-bg p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:p-12">

          <span className="text-xs font-bold uppercase tracking-[3px] text-hover">
            {heading.span}
          </span>

          <h1
            className="mt-1 text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {heading.title}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-text sm:text-base">
            {heading.desc}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <NavLink
              to="/recipes"
              className="rounded-md bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
            >
              Try Tool
            </NavLink>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Heros;
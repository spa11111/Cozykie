import { NavLink } from "react-router-dom";

const Heros = ({ heading, image, alt, ctaLabel = "Try Tool", ctaTo = "/recipes" }) => {
  return (
    <section className="bg-dark-bg py-12 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div className="relative mx-auto w-full max-w-[1600px]">

        {/* Image */}
        <div className="ml-auto w-[72%]">
          <img
            src={image}
            alt={alt}
            className="h-[500px] w-full rounded-md object-cover"
          />
        </div>

        {/* Content card */}
        <div className="absolute left-0 top-1/2 w-[520px] max-w-[80%] -translate-y-1/2 rounded-2xl bg-light-bg p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] sm:p-12">

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

          {ctaLabel && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <NavLink
                to={ctaTo}
                className="rounded-md bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
              >
                {ctaLabel}
              </NavLink>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Heros; 
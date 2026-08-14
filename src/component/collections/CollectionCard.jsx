import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CollectionCard = ({ collection }) => {
  const {
    slug,
    name,
    tag,
    description,
    recipeCount,
    image,
  } = collection;

  return (
    <Link
      to={`/recipes?filter=${encodeURIComponent(tag)}`}
      className="group relative block h-[420px] overflow-hidden rounded-3xl"
    >
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Tag */}
      <span className="absolute top-4 left-4 rounded-full bg-tag-bg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
        {tag}
      </span>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3
          className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-tag"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {name}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-white/80">
          {description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-white/80">
            {recipeCount} Recipes
          </span>

          <FiArrowRight
            size={17}
            className="text-tag transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
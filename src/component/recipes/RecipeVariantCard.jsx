import { NavLink } from "react-router-dom";
import { FiStar, FiArrowRight } from "react-icons/fi";

const normalize = (str) => str.trim().toLowerCase();

const getUniqueIngredients = (currentIngredients, variantIngredients) => {
  const currentSet = new Set(currentIngredients.map(normalize));
  return variantIngredients.filter((item) => !currentSet.has(normalize(item)));
};

const RecipeVariantCard = ({ variant, currentRecipe }) => {
  const uniqueIngredients = getUniqueIngredients(
    currentRecipe.ingredients,
    variant.ingredients
  );

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="h-40 overflow-hidden">
        <img
          src={variant.image}
          alt={variant.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {variant.author?.avatar && (
            <img
              src={variant.author.avatar}
              alt={variant.author.name}
              className="w-5 h-5 rounded-full object-cover"
            />
          )}
          <span className="text-xs text-text">
            By <span className="font-semibold text-primary">{variant.author?.name}</span>
          </span>
        </div>

        <h3
          className="text-lg font-bold text-primary mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {variant.name}
        </h3>

        <div className="flex items-center gap-2 text-xs text-text mb-3">
          <FiStar className="fill-accent text-accent" size={12} />
          <span className="font-semibold text-primary">{variant.rating}</span>
          <span>•</span>
          <span>{variant.time}</span>
          <span>•</span>
          <span>{variant.difficulty}</span>
        </div>

        {uniqueIngredients.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1.5">
              What's different
            </p>
            <ul className="space-y-1">
              {uniqueIngredients.slice(0, 3).map((item, i) => (
                <li key={i} className="text-xs text-text flex items-start gap-1.5">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <NavLink
          to={`/recipes/${variant.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors"
        >
          View this version
          <FiArrowRight size={14} />
        </NavLink>
      </div>
    </div>
  );
};

export default RecipeVariantCard;
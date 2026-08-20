import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiStar, FiHeart, FiShare2, FiShoppingBag, FiClock } from "react-icons/fi";
import { toggleFavorite } from "../../redux/actions/favorites.actions";

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const RecipeOverview = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userFavorites = useSelector((state) =>
    user ? state.favorites[user.id] || [] : []
  );

  const saved = userFavorites.some((r) => r.slug === recipe.slug);

  const handleOrderNow = () => {
    if (!user) {
      toast.info("Please log in to place an order.");
      navigate("/login");
      return;
    }

    navigate(`/order/${recipe.slug}`);
  };

  const handleSaveRecipe = () => {
    if (!user) {
      toast.info("Please log in to save recipes.");
      navigate("/login");
      return;
    }

    dispatch(toggleFavorite(user.id, recipe));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
      {/* Image */}
      <div className="rounded-3xl overflow-hidden h-60 sm:h-96 lg:h-[520px]">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center">
        <span className="text-xs uppercase tracking-[3px] font-semibold text-accent mb-3">
          {recipe.badge}
        </span>

        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {recipe.name}
        </h1>

        {recipe.author && (
          <div className="flex items-center gap-2.5 mb-4">
            {recipe.author.avatar && (
              <img
                src={recipe.author.avatar}
                alt={recipe.author.name}
                className="w-7 h-7 rounded-full object-cover"
              />
            )}
            <span className="text-sm text-text">
              Recipe by <span className="font-semibold text-primary">{recipe.author.name}</span>
            </span>
          </div>
        )}

        <p className="text-text text-base leading-relaxed mb-6 max-w-md">
          {recipe.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-sm text-text mb-4">
          <span>•</span>
          <span>{recipe.time}</span>
          <span>•</span>
          <span>{recipe.difficulty}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-text mb-8">
          {recipe.stock > 0 ? (
            <span className="text-primary font-medium">{recipe.stock} in stock</span>
          ) : (
            <span className="text-red-500 font-medium">Out of stock</span>
          )}
          {recipe.availableUntil && (
            <>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <FiClock size={13} />
                Available until {formatDate(recipe.availableUntil)}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleOrderNow}
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-accent rounded-full px-6 py-3.5 hover:bg-primary transition-colors duration-300"
          >
            <FiShoppingBag size={15} />
            Order Now
          </button>

          <button
            onClick={handleSaveRecipe}
            className={`inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-full px-6 py-3.5 border transition-colors duration-300 ${
              saved
                ? "bg-primary text-white border-primary"
                : "text-primary border-border hover:border-accent hover:text-accent"
            }`}
          >
            <FiHeart size={15} className={saved ? "fill-white" : ""} />
            {saved ? "Saved" : "Save Recipe"}
          </button>

          <button className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary border border-border rounded-full px-5 py-3.5 hover:border-accent hover:text-accent transition-colors duration-300">
            <FiShare2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeOverview;
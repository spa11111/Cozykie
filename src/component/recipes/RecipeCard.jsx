import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiStar, FiArrowRight, FiShoppingBag } from "react-icons/fi";

const formatNPR = (amount) =>
  `Rs. ${amount.toLocaleString("en-IN")}`;

const getLoggedInUser = () => {
  const savedUser = localStorage.getItem("cozykieUser");
  return savedUser ? JSON.parse(savedUser) : null;
};

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const {
    slug,
    name,
    badge,
    description,
    rating,
    time,
    difficulty,
    image,
    price,
    stock,
  } = recipe;

  const isLowStock = stock > 0 && stock <= 5;
  const isOutOfStock = stock === 0;

  const handleOrderNow = () => {
    const user = getLoggedInUser();

    if (!user) {
      toast.info("Please log in to place an order.");
      navigate("/login");
      return;
    }

    navigate(`/order/${slug}`);
  };

  return (
    <div className="group bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image with badge */}
      <NavLink to={`/recipes/${slug}`} className="relative block h-[250px] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <span className="absolute left-4 top-4 rounded-full bg-tag-bg px-3 py-1.5 text-xs font-semibold text-primary">
          {badge}
        </span>
      </NavLink>

      {/* Body */}
      <div className="p-5 sm:p-6">
        <NavLink to={`/recipes/${slug}`}>
          <h3
            className="text-xl font-bold text-primary mb-1.5 group-hover:text-accent transition-colors duration-300"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {name}
          </h3>
        </NavLink>

        <p className="text-sm text-text leading-relaxed mb-3">
          {description}
        </p>

        <div className="flex items-center gap-1.5 text-sm text-text mb-4">
          <FiStar className="fill-accent text-accent" size={13} />
          <span className="font-semibold text-primary">{rating}</span>
          <span>•</span>
          <span>{time}</span>
          <span>•</span>
          <span>{difficulty}</span>
        </div>

        {/* Price + stock */}
        <div className="flex items-center justify-between pt-4 border-t border-border mb-4">
          <span className="text-lg font-bold text-primary">
            {formatNPR(price)}
            <span className="text-xs font-normal text-text"> / dozen</span>
          </span>

          {isOutOfStock ? (
            <span className="text-xs font-semibold text-red-500">Out of Stock</span>
          ) : isLowStock ? (
            <span className="text-xs font-semibold text-accent">
              Only {stock} left
            </span>
          ) : (
            <span className="text-xs font-semibold text-text">
              {stock} in stock
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <NavLink
            to={`/recipes/${slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-primary border border-border rounded-full py-2.5 hover:border-accent hover:text-accent transition-colors duration-300"
          >
            View Recipe
            <FiArrowRight size={14} />
          </NavLink>

          <button
            onClick={handleOrderNow}
            disabled={isOutOfStock}
            className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold rounded-full py-2.5 transition-colors duration-300 ${
              isOutOfStock
                ? "bg-border text-text cursor-not-allowed"
                : "bg-accent text-white hover:bg-primary"
            }`}
          >
            <FiShoppingBag size={14} />
            {isOutOfStock ? "Sold Out" : "Order Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
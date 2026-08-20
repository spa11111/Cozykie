import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { FiHeart, FiStar, FiImage } from "react-icons/fi";
import { toggleFavorite } from "../../redux/actions/favorites.actions";
import UserLayout from "../../layout/UserLayout";

const FavoriteCard = ({ recipe, onRemove }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border group relative hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <NavLink to={`/recipes/${recipe.slug}`}>
        <div className="relative w-full aspect-square bg-primary/5">
          {!imgError && recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-primary/30">
              <FiImage size={28} className="mb-1" />
              <span className="text-xs">No image</span>
            </div>
          )}

          {recipe.badge && (
            <span className="absolute top-3 left-3 text-xs font-medium bg-white/90 text-primary px-3 py-1 rounded-full">
              {recipe.badge}
            </span>
          )}
        </div>
      </NavLink>

      <button
        onClick={onRemove}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
        aria-label="Remove from favorites"
      >
        <FiHeart size={15} className="fill-primary text-primary" />
      </button>

      <div className="p-5">
        <h3
          className="text-lg font-semibold text-primary mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {recipe.name}
        </h3>
        <p className="text-sm text-text line-clamp-2 mb-3">
          {recipe.description}
        </p>
      </div>
    </div>
  );
};

const Favourites = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) =>
    user ? state.favorites[user.id] || [] : []
  );

  return (
    <UserLayout>
      <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-12">
        <span className="text-xs uppercase tracking-[3px] font-semibold text-accent">
          Saved
        </span>
        <h1
          className="text-3xl sm:text-4xl font-bold text-primary mt-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Your Favorites
        </h1>
      </section>

      <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-16">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <h2
              className="text-2xl font-bold text-primary mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              No saved recipes yet
            </h2>
            <p className="text-text mb-6">
              Tap the heart on any recipe to save it here.
            </p>
            <NavLink
              to="/recipes"
              className="inline-block text-sm font-semibold text-white bg-primary rounded-full px-6 py-3.5 hover:bg-accent transition-colors duration-300"
            >
              Browse recipes
            </NavLink>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((recipe) => (
              <FavoriteCard
                key={recipe.slug}
                recipe={recipe}
                onRemove={() => dispatch(toggleFavorite(user.id, recipe))}
              />
            ))}
          </div>
        )}
      </section>
    </UserLayout>
  );
};

export default Favourites;
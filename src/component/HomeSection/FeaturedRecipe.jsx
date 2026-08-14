import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiStar, FiArrowRight } from "react-icons/fi";
import SectionHeads from "../SectionHeads";
import { getRecipes } from "../../services/api";

const heading = {
  span: "TODAY'S RECIPE",
  title: "A recipe worth sharing",
  desc: "Soft, chewy, and packed with flavour—this recipe deserves a place in your recipe book.",
};

const FeaturedRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await getRecipes();
        setRecipes(data.slice(0, 4));
      } catch (err) {
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <section className="bg-dark-bg px-6 py-16 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <SectionHeads heading={heading} />
        <p className="text-center text-text py-16">Loading recipes...</p>
      </section>
    );
  }

  return (
    <section className="bg-dark-bg px-6 py-16 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <SectionHeads heading={heading} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.slug}
            className="group flex flex-col overflow-hidden rounded-3xl bg-light-bg shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <NavLink
              to={`/recipes/${recipe.slug}`}
              className="block h-56 overflow-hidden"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </NavLink>

            <div className="flex flex-1 flex-col p-4">
              <span className="mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold bg-accent text-border">
                {recipe.badge}
              </span>

              <h3
                className="mb-2 text-xl font-bold text-primary"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {recipe.name}
              </h3>

              <p className="mb-3 text-sm leading-relaxed text-text">
                {recipe.description}
              </p>

              <div className="mb-4 flex items-center gap-1.5 text-sm text-text">
                <FiStar className="fill-tag text-tag" size={13} />
                <span className="font-semibold">{recipe.rating}</span>
                <span>•</span>
                <span>{recipe.time}</span>
                <span>•</span>
                <span>{recipe.difficulty}</span>
              </div>

              <NavLink
                to={`/recipes/${recipe.slug}`}
                className="mt-auto flex items-center justify-end gap-2 text-sm font-semibold text-accent transition-colors duration-300 hover:text-primary"
              >
                Try it out
                <FiArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipe;
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import UserLayout from "../../layout/UserLayout";
import RecipeOverview from "../../component/recipes/RecipeOverview";
import RecipeMeta from "../../component/recipes/RecipeMeta";
import IngredientsList from "../../component/recipes/IngredientsList";
import RecipeInstructions from "../../component/recipes/RecipeInstructions";
import BakingTips from "../../component/recipes/BakingTips";
import RecipeVariantCard from "../../component/recipes/RecipeVariantCard";
import { getRecipeBySlug, getRecipesByCookieType } from "../../services/api";

const getTotalTime = (prepTime, bakeTime) => {
  const parse = (t) => parseInt(t) || 0;
  return `${parse(prepTime) + parse(bakeTime)} min`;
};

const RecipeDetail = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [variantRecipes, setVariantRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeBySlug(slug);
        setRecipe(data);
        setError(null);
      } catch (err) {
        setError("Couldn't load this recipe right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [slug]);

  useEffect(() => {
    if (!recipe) return;

    const fetchVariants = async () => {
      try {
        const data = await getRecipesByCookieType(recipe.cookieType, recipe.slug);
        setVariantRecipes(data.slice(0, 3));
      } catch (err) {
        setVariantRecipes([]);
      }
    };

    fetchVariants();
  }, [recipe]);

  if (loading) {
    return (
      <UserLayout>
        <section className="bg-light-bg px-6 py-24 text-center">
          <p className="text-text">Loading recipe...</p>
        </section>
      </UserLayout>
    );
  }

  if (error || !recipe) {
    return (
      <UserLayout>
        <section className="bg-light-bg px-6 py-24 text-center">
          <h1
            className="text-3xl font-bold text-primary mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Recipe not found
          </h1>
          <p className="text-text mb-8">
            The recipe you're looking for doesn't exist or may have been removed.
          </p>
          <NavLink
            to="/recipes"
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold rounded-full px-6 py-3 hover:bg-accent transition-colors duration-300"
          >
            Back to Recipes
          </NavLink>
        </section>
      </UserLayout>
    );
  }

  const totalTime = getTotalTime(recipe.prepTime, recipe.bakeTime);

  return (
    <UserLayout>
      <div className="bg-light-bg">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-14">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text mb-8">
            <NavLink to="/" className="hover:text-accent transition-colors">
              Home
            </NavLink>
            <FiChevronRight size={14} />
            <NavLink to="/recipes" className="hover:text-accent transition-colors">
              Recipes
            </NavLink>
            <FiChevronRight size={14} />
            <span className="text-primary font-medium">{recipe.name}</span>
          </div>

          {/* Hero */}
          <div className="mb-12">
            <RecipeOverview recipe={recipe} />
          </div>

          {/* Quick Info */}
          <div className="mb-16">
            <RecipeMeta
              prepTime={recipe.prepTime}
              bakeTime={recipe.bakeTime}
              totalTime={totalTime}
              difficulty={recipe.difficulty}
              servings={recipe.servings}
            />
          </div>

          {/* About */}
          <div className="mb-16 max-w-3xl">
            <h2
              className="text-2xl font-bold text-primary mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              About This Recipe
            </h2>
            <p className="text-text text-sm leading-relaxed">
              {recipe.description} Made with simple, everyday ingredients,
              this recipe comes together with minimal fuss and bakes up{" "}
              {recipe.difficulty.toLowerCase()}, making it a reliable choice
              whether you're baking for yourself or sharing with others.
            </p>
          </div>

          {/* Ingredients + Instructions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
            <div className="lg:col-span-1">
              <IngredientsList ingredients={recipe.ingredients} />
            </div>
            <div className="lg:col-span-2">
              <RecipeInstructions instructions={recipe.instructions} />
            </div>
          </div>

          {/* Baking Tips */}
          <div className="mb-16">
            <BakingTips tips={recipe.tips} />
          </div>

          {/* Same Cookie, Different Authors */}
          {variantRecipes.length > 0 && (
            <div>
              <h2
                className="text-2xl font-bold text-primary mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Other Takes on {recipe.name}
              </h2>
              <p className="text-sm text-text mb-6">
                Same cookie, different bakers — see how each version differs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {variantRecipes.map((variant) => (
                  <RecipeVariantCard
                    key={variant.slug}
                    variant={variant}
                    currentRecipe={recipe}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </UserLayout>
  );
};

export default RecipeDetail;
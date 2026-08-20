import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
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

const Eyebrow = ({ children }) => (
  <span className="text-xs uppercase tracking-[3px] font-semibold text-accent">
    {children}
  </span>
);

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
    if (!recipe || !recipe.cookieType) {
      setVariantRecipes([]);
      return;
    }

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
      <section className="bg-light-bg px-6 py-16 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="max-w-6xl mx-auto">

          {/* Hero */}
          <div className="mb-12">
            <RecipeOverview recipe={recipe} />
          </div>

          {/* Quick Info */}
          <div className="mb-16  border border-border bg-dark-bg">
            <RecipeMeta
              prepTime={recipe.prepTime}
              bakeTime={recipe.bakeTime}
              totalTime={totalTime}
              difficulty={recipe.difficulty}
              servings={recipe.servings}
            />
          </div>

          {/* About */}
          <div className="mb-16 max-w-6xl">
            <Eyebrow>The Story</Eyebrow>
            <h2
              className="text-2xl font-bold text-primary mt-1 mb-4"
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
          <div className="mb-16">
            <Eyebrow>How It's Made</Eyebrow>
            <h2
              className="text-2xl font-bold text-primary mt-1 mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Ingredients &amp; Method
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-1 bg-white border border-border rounded-2xl p-6">
                <IngredientsList ingredients={recipe.ingredients} />
              </div>
              <div className="lg:col-span-2 bg-white border border-border rounded-2xl p-6">
                <RecipeInstructions instructions={recipe.instructions} />
              </div>
            </div>
          </div>

          {/* Baking Tips */}
          <div className="mb-16 bg-accent/5 border border-accent/20 rounded-2xl p-6 sm:p-8">
            <Eyebrow>From the Baker</Eyebrow>
            <div className="mt-1">
              <BakingTips tips={recipe.tips} />
            </div>
          </div>

          {/* Same Cookie, Different Authors */}
          {variantRecipes.length > 0 && (
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8">
              <Eyebrow>Community Bakes</Eyebrow>
              <h2
                className="text-2xl font-bold text-primary mt-1 mb-2"
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
      </section>
    </UserLayout>
  );
};

export default RecipeDetail;
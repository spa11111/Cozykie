import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import UserLayout from "../../layout/UserLayout";
import Heros from "../../component/Heros";
import RecipeFilters from "../../component/recipes/RecipeFilters";
import RecipeSort from "../../component/recipes/RecipeSort";
import RecipeCard from "../../component/recipes/RecipeCard";
import { getRecipes } from "../../services/api";
import recipesHero from "../../assets/images/recipes-hero.jpg";

const heading = {
  span: "Recipes",
  title: "Find something worth baking.",
  desc: "Browse comforting cookies and homemade favourites, from quick weekday bakes to community-loved recipes.",
};

const DIFFICULTY_RANK = { Easy: 1, Medium: 2, Hard: 3 };

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFilter = searchParams.get("filter");

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeFilter, setActiveFilter] = useState(urlFilter || "All");
  const [activeSort, setActiveSort] = useState("rating");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await getRecipes();
        setRecipes(data);
        setError(null);
      } catch (err) {
        setError("Couldn't load recipes right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    setActiveFilter(urlFilter || "All");
  }, [urlFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);

    if (filter === "All") {
      searchParams.delete("filter");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ filter });
    }
  };

  const filteredRecipes = useMemo(() => {
    const base =
      activeFilter === "All"
        ? recipes
        : recipes.filter((recipe) => recipe.category === activeFilter);

    const sorted = [...base];

    switch (activeSort) {
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "az":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "difficulty":
        sorted.sort(
          (a, b) => DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty]
        );
        break;
      case "quickest":
        sorted.sort((a, b) => parseInt(a.time) - parseInt(b.time));
        break;
      case "stock":
        sorted.sort((a, b) => b.stock - a.stock);
        break;
      default:
        break;
    }

    return sorted;
  }, [recipes, activeFilter, activeSort]);

  return (
    <UserLayout>
      {/* Hero */}
      <Heros
        heading={heading}
        image={recipesHero}
        alt="Freshly baked cookies"
        ctaLabel={null}
      />

      {/* Filter + Sort */}
      <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-12">
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
          <RecipeFilters activeFilter={activeFilter} onChange={handleFilterChange} />
          <RecipeSort activeSort={activeSort} onChange={setActiveSort} />
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-16">
        {loading ? (
          <p className="text-center text-text py-16">Loading recipes...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-16">{error}</p>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text py-16">
            No recipes found for this filter yet.
          </p>
        )}
      </section>
    </UserLayout>
  );
};

export default Recipes;
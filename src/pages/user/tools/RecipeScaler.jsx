import { useState } from "react";
import { toast } from "react-toastify";
import UserLayout from "../../../layout/UserLayout";
import ToolCard from "../../../component/tools/ToolCard";
import RelatedTools from "../../../component/tools/RelatedTools";
import {
  FiPackage,
  FiRepeat,
  FiTrash2,
} from "react-icons/fi";
import Heros from "../../../component/Heros";
import recipeScaler from "../../../assets/images/recipe-scaler.jpg";

const heading = {
  span: "Recipe Scaler",
  title: "Make every batch the right size.",
  desc: "Scale up for a crowd or down for a quiet afternoon — adjust your servings and let Cozykie handle the ingredient math.",
};

const UNIT_OPTIONS = ["g", "kg", "ml", "l", "tsp", "tbsp", "cup"];

let nextIngredientId = 4;

const RecipeScaler = () => {
  const [currentServings, setCurrentServings] = useState(12);
  const [desiredServings, setDesiredServings] = useState(24);

  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      name: "Flour",
      amount: 250,
      unit: "g",
    },
  ]);

  const [scaledIngredients, setScaledIngredients] = useState(null);

  const updateIngredient = (id, field, value) => {
    setIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, [field]: value }
          : ingredient
      )
    );
  };

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      {
        id: nextIngredientId++,
        name: "",
        amount: 0,
        unit: "g",
      },
    ]);
  };

  const removeIngredient = (id) => {
    setIngredients((prev) =>
      prev.filter((ingredient) => ingredient.id !== id)
    );
  };

  const handleScale = () => {
    const current = Number(currentServings);
    const desired = Number(desiredServings);

    if (current <= 0 || desired <= 0) {
      toast.error("Servings must be greater than zero.");
      setScaledIngredients(null);
      return;
    }

    const hasInvalidIngredient = ingredients.some(
      (ingredient) =>
        ingredient.name.trim() === "" ||
        Number(ingredient.amount) <= 0
    );

    if (hasInvalidIngredient) {
      toast.error(
        "Every ingredient needs a name and an amount greater than zero."
      );
      setScaledIngredients(null);
      return;
    }

    const results = ingredients.map((ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      amount:
        Math.round(
          (Number(ingredient.amount) * desired) / current * 10
        ) / 10,
      unit: ingredient.unit,
    }));

    setScaledIngredients(results);
  };

  return (
    <UserLayout>
      <Heros
        heading={heading}
        image={recipeScaler}
        alt="Ingredients being prepared for baking"
      />

<section className="bg-light-bg py-12 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
  <div className="mx-auto w-full">

          {/* Tool Card */}
          <ToolCard
            title="Recipe Scaler"
            actionText="Scale Recipe"
            onAction={handleScale}
          >
            {/* Servings */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  Current Servings
                </label>

                <input
                  type="number"
                  value={currentServings}
                  onChange={(e) => setCurrentServings(e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 text-text focus:outline-none focus:ring-1"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  Desired Servings
                </label>

                <input
                  type="number"
                  value={desiredServings}
                  onChange={(e) => setDesiredServings(e.target.value)}
                  className="w-full rounded-xl border border-border px-4 py-3 text-text focus:outline-none focus:ring-1"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="mb-3 block text-sm font-medium text-primary">
                Ingredients
              </label>

              <div className="space-y-4">
                {ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex flex-col gap-3 sm:flex-row sm:items-center"
                  >
                    {/* Ingredient name */}
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) =>
                        updateIngredient(
                          ingredient.id,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Ingredient name"
                      className="min-w-0 flex-1 rounded-xl border border-border px-4 py-3 text-text focus:outline-none focus:ring-1"
                    />

                    {/* Amount */}
                    <input
                      type="number"
                      value={ingredient.amount}
                      onChange={(e) =>
                        updateIngredient(
                          ingredient.id,
                          "amount",
                          e.target.value
                        )
                      }
                      placeholder="Amount"
                      className="w-full rounded-xl border border-border px-4 py-3 text-text sm:w-32 focus:outline-none focus:ring-1"
                    />

                    {/* Unit */}
                    <select
                      value={ingredient.unit}
                      onChange={(e) =>
                        updateIngredient(
                          ingredient.id,
                          "unit",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-border px-4 py-3 text-text sm:w-32 focus:outline-none focus:ring-1"
                    >
                      {UNIT_OPTIONS.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeIngredient(ingredient.id)}
                      aria-label="Remove ingredient"
                      className="shrink-0 self-end rounded-lg p-2 text-accent transition-colors duration-200 hover:text-red-800 sm:self-auto"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add ingredient */}
              <button
                type="button"
                onClick={addIngredient}
                className="mt-6 w-full  max-w-7xl rounded-2xl border border-dashed border-primary px-4 py-3.5 font-medium text-primary transition-colors duration-200 hover:bg-primary/5"
              >
                + Add Ingredient
              </button>
            </div>
          </ToolCard>

          {/* Updated Ingredients */}
          {scaledIngredients && (
            <div className="mx-auto mt-6 max-w-7xl rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
              <h2
                className="mb-8 text-center text-2xl font-semibold text-primary sm:text-3xl"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Updated Ingredients
              </h2>

              <ul className="space-y-3">
                {scaledIngredients.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="flex items-center justify-between rounded-xl border border-border px-5 py-4 text-primary"
                  >
                    <span>✓ {ingredient.name}</span>

                    <span className="font-medium">
                      {ingredient.amount} {ingredient.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Tools */}
          <div className="mt-14 border-border pt-10">
            <RelatedTools
              tools={[
                {
                  icon: FiRepeat,
                  name: "Measurement Converter",
                  desc: "Switch between cups, grams, and ounces without doing the math.",
                  path: "/tools/converter",
                },
                {
                  icon: FiPackage,
                  name: "Pantry Substitution",
                  desc: "Find simple ingredient swaps using what you already have in your kitchen.",
                  path: "/tools/substitution",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default RecipeScaler;
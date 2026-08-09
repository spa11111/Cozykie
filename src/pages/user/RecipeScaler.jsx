import { useState } from "react";
import { toast } from "react-toastify";
import UserLayout from "../../layout/UserLayout";
import Heros from "../../component/Heros";
import ToolCard from "../../component/tools/ToolCard";
import recipeScaler from "../../assets/images/recipe-scaler.jpg";
import { FiPackage, FiRepeat, FiSliders, FiTrash2 } from "react-icons/fi";
import RelatedTools from "../../component/tools/RelatedTools";

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
    { id: 1, name: "Flour", amount: 250, unit: "g" },
  ]);
  const [scaledIngredients, setScaledIngredients] = useState(null);

  const updateIngredient = (id, field, value) => {
    setIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
    
      )
    );
  };

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: nextIngredientId++, name: "", amount: 0, unit: "g" },
    ]);
  };

  const removeIngredient = (id) => {
    setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
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
      (ingredient) => ingredient.name.trim() === "" || Number(ingredient.amount) <= 0
    );

    if (hasInvalidIngredient) {
      toast.error("Every ingredient needs a name and an amount greater than zero.");
      setScaledIngredients(null);
      return;
    }

    const results = ingredients.map((ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      amount: Math.round((Number(ingredient.amount) * desired / current) * 10) / 10,
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

      <div className="max-w-2xl mx-auto px-6 lg:px-0 pb-20 pt-12">
        <ToolCard title="Recipe Card" actionText="Scale Recipe" onAction={handleScale}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Current Servings
              </label>
              <input
                type="number"
                min="1"
                value={currentServings}
                onChange={(e) => setCurrentServings(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-2 text-primary focus:outline-none focus:ring-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Desired Servings
              </label>
              <input
                type="number"
                min="1"
                value={desiredServings}
                onChange={(e) => setDesiredServings(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-2 text-primary focus:outline-none focus:ring-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2 ">
              Ingredients
            </label>
            <div className="space-y-3">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex flex-col sm:flex-row gap-3 sm:items-center border-none"
                >
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(ingredient.id, "name", e.target.value)}
                    placeholder="Ingredient name"
                    className="flex-1 border border-border rounded-xl px-3 py-2 text-text focus:outline-none focus:ring-1"
                  />
                  <input
                    type="number"
                    value={ingredient.amount}
                    onChange={(e) => updateIngredient(ingredient.id, "amount", e.target.value)}
                    placeholder="Amount"
                    className="w-full sm:w-28 border border-border rounded-xl px-3 py-2 text-text focus:outline-none focus:ring-1"
                  />
                  <select
                    value={ingredient.unit}
                    onChange={(e) => updateIngredient(ingredient.id, "unit", e.target.value)}
                    className="w-full sm:w-28 border border-border rounded-xl px-3 py-2 text-text focus:outline-none focus:ring-1"
                  >
                    {UNIT_OPTIONS.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeIngredient(ingredient.id)}
                    aria-label="Remove ingredient"
                    className="shrink-0 p-2 rounded-lg text-accent hover:text-red-800 transition-colors duration-200"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addIngredient}
              className="w-full mt-6 border border-dashed border-primary text-primary rounded-2xl py-2 font-medium hover:bg-primary/5 transition-colors duration-200"
            >
              + Add Ingredient
            </button>
          </div>
        </ToolCard>

        {scaledIngredients && (
          <div className="mt-6 bg-white border border-border rounded-3xl shadow-md p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-primary text-center mb-4">
              Updated Ingredients
            </h2>
            <ul className="space-y-2">
              {scaledIngredients.map((ingredient) => (
                <li
                  key={ingredient.id}
                  className="flex justify-between text-primary border-b border-border pb-2 last:border-none"
                >
                  <span>✓ {ingredient.name}</span>
                  <span>
                    {ingredient.amount} {ingredient.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related tools */}
        <div className="mt-14 pt-10 border-border">
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
    </UserLayout>
  );
};

export default RecipeScaler;
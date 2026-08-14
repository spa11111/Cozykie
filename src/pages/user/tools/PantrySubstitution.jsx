import { useState } from "react";
import { toast } from "react-toastify";

import UserLayout from "../../../layout/UserLayout";
import Heros from "../../../component/Heros";
import ToolCard from "../../../component/tools/ToolCard";
import RelatedTools from "../../../component/tools/RelatedTools";

// import pantrySubstitution from "../../../assets/images/substitution.jpg";

import {
  FiRepeat,
  FiSliders,
} from "react-icons/fi";


const heading = {
  span: "Pantry Substitution",
  title: "Bake with what you have.",
  desc: "Missing an ingredient? Find practical swaps from everyday pantry staples without putting your recipe on hold.",
};

const SUBSTITUTIONS = [
  {
    ingredient: "Butter",
    options: [
      {
        substitute: "Coconut oil",
        ratio: "1:1",
        note: "Works well in cookies and cakes with a slightly different flavour.",
      },
      {
        substitute: "Vegetable oil",
        ratio: "3/4 cup per 1 cup butter",
        note: "Keeps baked goods moist and works best in softer recipes.",
      },
    ],
  },
  {
    ingredient: "Egg",
    options: [
      {
        substitute: "Applesauce",
        ratio: "1/4 cup per 1 egg",
        note: "Best for cakes, muffins, and softer baked goods.",
      },
      {
        substitute: "Mashed banana",
        ratio: "1/2 banana per 1 egg",
        note: "Adds moisture and a mild banana flavour.",
      },
    ],
  },
  {
    ingredient: "Milk",
    options: [
      {
        substitute: "Plain yogurt",
        ratio: "3/4 cup per 1 cup milk",
        note: "Creates a slightly richer and more tender texture.",
      },
      {
        substitute: "Water",
        ratio: "1:1",
        note: "Works in many recipes, though the final result may be slightly less rich.",
      },
    ],
  },
  {
    ingredient: "Brown Sugar",
    options: [
      {
        substitute: "White sugar + molasses",
        ratio: "1 cup + 1 tbsp molasses",
        note: "A close substitute that keeps the characteristic brown sugar flavour.",
      },
      {
        substitute: "White sugar",
        ratio: "1:1",
        note: "Works in most recipes but produces a slightly lighter flavour and texture.",
      },
    ],
  },
  {
    ingredient: "Baking Powder",
    options: [
      {
        substitute: "Baking soda + cream of tartar",
        ratio: "1/4 tsp soda + 1/2 tsp cream of tartar per 1 tsp",
        note: "Provides a similar leavening effect when used in the right ratio.",
      },
    ],
  },
  {
    ingredient: "All-Purpose Flour",
    options: [
      {
        substitute: "Bread flour",
        ratio: "1:1",
        note: "Produces a slightly chewier texture because of its higher protein content.",
      },
      {
        substitute: "Cake flour",
        ratio: "1 cup + 2 tbsp per 1 cup",
        note: "Creates a softer and more delicate texture.",
      },
    ],
  },
];

const PantrySubstitution = () => {
  const [ingredient, setIngredient] = useState("");
  const [available, setAvailable] = useState("");
  const [result, setResult] = useState(null);

  const selectedIngredient = SUBSTITUTIONS.find(
    (item) => item.ingredient === ingredient
  );

  const handleFindSubstitute = () => {
    if (!ingredient) {
      toast.error("Please select an ingredient to replace.");
      setResult(null);
      return;
    }

    if (!available) {
      toast.error("Please choose what you have available.");
      setResult(null);
      return;
    }

    const substitution = selectedIngredient?.options.find(
      (option) =>
        option.substitute.toLowerCase() === available.toLowerCase()
    );

    if (!substitution) {
      toast.info(
        `You can use ${available} as a possible substitute. Check the options below.`
      );

      setResult({
        substitute: available,
        ratio: "Check recipe",
        note: "This ingredient may work depending on the recipe and desired texture.",
      });

      return;
    }

    setResult(substitution);
  };

  const availableOptions =
    selectedIngredient?.options || [];

  return (
    <UserLayout>
      <Heros
        heading={heading}
        image={pantrySubstitution}
        alt="Baking ingredients arranged on a kitchen counter"
      />

<section className="bg-light-bg py-12 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
  <div className="mx-auto w-full">

          {/* Tool Card */}
          <ToolCard
            title="Find a Substitute"
            actionText="Find Substitute"
            onAction={handleFindSubstitute}
          >
            {/* Ingredient */}
            <div>
              <label className="mb-2 block text-sm font-medium text-primary">
                Ingredient to replace
              </label>

              <select
                value={ingredient}
                onChange={(e) => {
                  setIngredient(e.target.value);
                  setAvailable("");
                  setResult(null);
                }}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
              >
                <option value="">
                  Select an ingredient
                </option>

                {SUBSTITUTIONS.map((item) => (
                  <option
                    key={item.ingredient}
                    value={item.ingredient}
                  >
                    {item.ingredient}
                  </option>
                ))}
              </select>
            </div>

            {/* Available Ingredient */}
            <div>
              <label className="mb-2 block text-sm font-medium text-primary">
                What do you have?
              </label>

              <select
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
                disabled={!ingredient}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:bg-light-bg disabled:text-text/50"
              >
                <option value="">
                  Select an available ingredient
                </option>

                {availableOptions.map((option) => (
                  <option
                    key={option.substitute}
                    value={option.substitute}
                  >
                    {option.substitute}
                  </option>
                ))}
              </select>
            </div>
          </ToolCard>

          {/* Result Card */}
          {result && (
            <div className="mx-auto mt-6 max-w-7xl rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
              <h2
                className="mb-6 text-center text-2xl font-semibold text-primary"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Suggested Substitute
              </h2>

              <div className="rounded-2xl bg-light-bg p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[2px] text-accent">
                      Use instead
                    </p>

                    <h3 className="text-xl font-semibold text-primary">
                      {result.substitute}
                    </h3>
                  </div>

                  <div className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary">
                    {result.ratio}
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-text">
                  {result.note}
                </p>
              </div>
            </div>
          )}

          {/* Related Tools */}
          <div className="mt-14 border-border pt-10">
            <RelatedTools
              tools={[
                {
                  icon: FiSliders,
                  name: "Recipe Scaler",
                  desc: "Adjust ingredient quantities for any batch size without doing the math yourself.",
                  path: "/tools/scaler",
                },
                {
                  icon: FiRepeat,
                  name: "Measurement Converter",
                  desc: "Switch between cups, grams, ounces, and more without doing the math.",
                  path: "/tools/converter",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default PantrySubstitution;
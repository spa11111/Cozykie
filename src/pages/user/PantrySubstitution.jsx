import { useState } from "react";
import { toast } from "react-toastify";
import UserLayout from "../../layout/UserLayout";
import Heros from "../../component/Heros";
import ToolCard from "../../component/tools/ToolCard";
import pantrySubstitution from "../../assets/images/substitution.jpg";
import RelatedTools from "../../component/tools/RelatedTools";
import { FiRepeat, FiSliders } from "react-icons/fi";

const heading = {
  span: "Pantry Substitutions",
  title: "Find the right swap.",
  desc: "Find simple ingredient swaps using what you already have — because a missing ingredient shouldn't stop a good bake.",
};

const SUBSTITUTIONS = {
  butter: {
    name: "Butter",
    options: [
      {
        name: "Coconut Oil",
        tag: "Oil",
        ratio: "1:1",
        note: "Use the same amount as butter.",
        why: "Provides a similar fat content and keeps cookies and cakes rich and tender.",
        bestFor: "Cookies, cakes, brownies",
      },
      {
        name: "Vegetable Oil",
        tag: "Oil",
        ratio: "¾ cup",
        note: "Use ¾ cup oil for 1 cup butter.",
        why: "Adds moisture without dairy and helps create a soft, tender texture.",
        bestFor: "Cakes, muffins",
      },
      {
        name: "Applesauce",
        tag: "Applesauce",
        ratio: "1:1",
        note: "Reduce added sugar slightly if needed.",
        why: "Adds moisture while reducing the amount of fat in the recipe.",
        bestFor: "Cakes, muffins",
      },
      {
        name: "Greek Yogurt",
        tag: "Yogurt",
        ratio: "1:1",
        note: "Adds moisture and a slightly tangy flavour.",
        why: "Its creamy texture helps keep baked goods soft and moist.",
        bestFor: "Muffins, quick breads",
      },
    ],
  },

  egg: {
    name: "Egg",
    options: [
      {
        name: "Flaxseed Meal",
        tag: "Flaxseed",
        ratio: "1 tbsp + 3 tbsp water",
        note: "Let sit for 5 minutes to thicken before using.",
        why: "Creates a gel-like texture that helps bind the ingredients together.",
        bestFor: "Cookies, muffins, pancakes",
      },
      {
        name: "Applesauce",
        tag: "Applesauce",
        ratio: "¼ cup",
        note: "Use ¼ cup in place of one egg.",
        why: "Adds moisture and helps bind ingredients without adding much flavour.",
        bestFor: "Cakes, muffins",
      },
      {
        name: "Mashed Banana",
        tag: "Banana",
        ratio: "¼ cup",
        note: "Use ¼ cup in place of one egg.",
        why: "Adds moisture and natural sweetness while helping hold the mixture together.",
        bestFor: "Muffins, quick breads",
      },
      {
        name: "Plain Yogurt",
        tag: "Yogurt",
        ratio: "¼ cup",
        note: "Use ¼ cup in place of one egg.",
        why: "Adds moisture and helps keep the finished bake soft.",
        bestFor: "Cakes",
      },
    ],
  },

  milk: {
    name: "Milk",
    options: [
      {
        name: "Almond Milk",
        tag: "Nut Milk",
        ratio: "1:1",
        note: "Use the same amount as milk.",
        why: "Has a similar liquid consistency and works well without significantly changing the recipe.",
        bestFor: "Cakes, pancakes, muffins",
      },
      {
        name: "Oat Milk",
        tag: "Oat Milk",
        ratio: "1:1",
        note: "Use the same amount as milk.",
        why: "Its creamy texture blends easily into batters while adding a mild sweetness.",
        bestFor: "Cookies, cakes, muffins",
      },
    ],
  },

  "brown-sugar": {
    name: "Brown Sugar",
    options: [
      {
        name: "White Sugar + Molasses",
        tag: "Molasses",
        ratio: "1 cup + 1 tbsp",
        note: "Mix 1 tbsp molasses into 1 cup white sugar.",
        why: "Recreates the deeper flavour and moisture that brown sugar provides.",
        bestFor: "Cookies, cakes",
      },
      {
        name: "Honey",
        tag: "Honey",
        ratio: "¾ cup",
        note: "Reduce other liquids in the recipe slightly.",
        why: "Adds sweetness and moisture while giving the bake a softer texture.",
        bestFor: "Cookies, cakes",
      },
    ],
  },

  "all-purpose-flour": {
    name: "All-Purpose Flour",
    options: [
      {
        name: "Cake Flour",
        tag: "Cake Flour",
        ratio: "1 cup + 2 tbsp",
        note: "Use 1 cup + 2 tbsp cake flour for 1 cup all-purpose flour.",
        why: "Its lower protein content produces a lighter and more delicate crumb.",
        bestFor: "Cakes, cupcakes",
      },
      {
        name: "Whole Wheat Flour",
        tag: "Whole Wheat",
        ratio: "⅞ cup",
        note: "Use slightly less than the original amount.",
        why: "Adds more structure and a nutty flavour while still working well in hearty bakes.",
        bestFor: "Muffins, quick breads",
      },
    ],
  },

  "baking-powder": {
    name: "Baking Powder",
    options: [
      {
        name: "Baking Soda + Cream of Tartar",
        tag: "Cream of Tartar",
        ratio: "¼ tsp soda + ½ tsp cream of tartar",
        note: "Use per 1 tsp of baking powder needed.",
        why: "Combines a base and an acid to create the leavening effect needed for the bake.",
        bestFor: "Cookies, cakes",
      },
    ],
  },

  "baking-soda": {
    name: "Baking Soda",
    options: [
      {
        name: "Baking Powder",
        tag: "Baking Powder",
        ratio: "1 tsp",
        note: "Use about 1 tsp baking powder for ¼ tsp baking soda.",
        why: "Contains its own acid, allowing it to provide lift even when the recipe has less available acidity.",
        bestFor: "Cookies, cakes",
      },
    ],
  },
};

const INGREDIENT_IDS = Object.keys(SUBSTITUTIONS);

const PantrySubstitution = () => {
  const [ingredientId, setIngredientId] = useState(INGREDIENT_IDS[0]);
  const [availableTag, setAvailableTag] = useState("any");
  const [results, setResults] = useState(null);

  const ingredient = SUBSTITUTIONS[ingredientId];

  const availableTags = [
    ...new Set(ingredient.options.map((option) => option.tag)),
  ];

  const handleIngredientChange = (id) => {
    setIngredientId(id);
    setAvailableTag("any");
    setResults(null);
  };

  const handleFindSubstitutions = () => {
    const matches =
      availableTag === "any"
        ? ingredient.options
        : ingredient.options.filter(
            (option) => option.tag === availableTag
          );

    if (matches.length === 0) {
      toast.error("No matching substitutes found for that combination.");
      setResults(null);
      return;
    }

    setResults({
      ingredientName: ingredient.name,
      options: matches,
    });
  };

  return (
    <UserLayout>
      {/* Hero */}
      <Heros
        heading={heading}
        image={pantrySubstitution}
        alt="Ingredients prepared for baking"
      />

      {/* Tool */}
      <div className="max-w-2xl mx-auto px-6 lg:px-0 pb-20 pt-12">
        <ToolCard
          title="Pantry Substitutions"
          actionText="Find Substitutions"
          onAction={handleFindSubstitutions}
        >
          {/* Ingredient to replace */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              What do you need to replace?
            </label>

            <select
              value={ingredientId}
              onChange={(e) => handleIngredientChange(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-3 text-primary bg-white focus:outline-none focus:ring-1"
            >
              {INGREDIENT_IDS.map((id) => (
                <option key={id} value={id}>
                  {SUBSTITUTIONS[id].name}
                </option>
              ))}
            </select>
          </div>

          {/* Available ingredient */}
          <div>
            <label className="block text-sm font-medium text-primary mb-1">
              What do you have?
            </label>

            <select
              value={availableTag}
              onChange={(e) => setAvailableTag(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-3 text-primary bg-white focus:outline-none focus:ring-1"
            >
              <option value="any">Any</option>

              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </ToolCard>

        {/* Results */}
        {results && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-primary mb-4">
              Good substitutes for {results.ingredientName}
            </h2>

            <div className="space-y-4">
              {results.options.map((option) => (
                <div
                  key={option.name}
                  className="bg-white border border-border rounded-2xl p-5"
                >
                  {/* Name + Ratio */}
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-semibold text-primary">
                      {option.name}
                    </span>

                    <span className="text-accent font-medium text-sm whitespace-nowrap">
                      {option.ratio}
                    </span>
                  </div>

                  {/* How to use */}
                  <p className="text-text text-sm mt-2 leading-relaxed">
                    {option.note}
                  </p>

                  {/* Why it works */}
                  <p className="text-text text-sm mt-3 leading-relaxed">
                    <span className="font-medium text-primary">
                      Why it works:
                    </span>{" "}
                    {option.why}
                  </p>

                  {/* Best for */}
                  <p className="text-text text-sm mt-2">
                    <span className="font-medium text-primary">
                      Best for:
                    </span>{" "}
                    {option.bestFor}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

          {/* Related tools */}
        <div className="mt-14 pt-10 border-border">
          <RelatedTools
            tools={[
              {
                icon: FiSliders,
                name: "Recipe Scaler",
                desc: "Adjust any recipe up or down to the exact batch size you need.",
                path: "/tools/scaler",
              },
              {
                icon: FiRepeat,
                name: "Measurement Converter",
                desc: "Switch between cups, grams, and ounces without doing the math.",
                path: "/tools/converter",
              },
            ]}
          />
        </div>
      </div>

    </UserLayout>
  );
};

export default PantrySubstitution;
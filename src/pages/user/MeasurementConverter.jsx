import { useState } from "react";
import { toast } from "react-toastify";
import UserLayout from "../../layout/UserLayout";
import Heros from "../../component/Heros";
import ToolCard from "../../component/tools/ToolCard";
import measurementConverter from "../../assets/images/measurement-converter.jpg";
import RelatedTools from "../../component/tools/RelatedTools";
import { FiPackage, FiSliders } from "react-icons/fi";

const heading = {
  span: "Measurement Converter",
  title: "Make every measurement count.",
  desc: "Convert baking measurements with simple, ingredient-aware conversions — no guesswork between cups and grams.",
};

const VOLUME_UNITS = ["cup", "tbsp", "tsp", "ml"];
const WEIGHT_UNITS = ["g", "kg", "oz", "lb"];

const UNIT_LABELS = {
  cup: "cups",
  tbsp: "tablespoons",
  tsp: "teaspoons",
  ml: "milliliters",
  g: "grams",
  kg: "kilograms",
  oz: "ounces",
  lb: "pounds",
};

const ML_PER_UNIT = { cup: 240, tbsp: 15, tsp: 5, ml: 1 };
const GRAMS_PER_UNIT = { g: 1, kg: 1000, oz: 28.35, lb: 453.6 };

const INGREDIENTS = [
  { id: "flour", name: "All-Purpose Flour", gramsPerCup: 120 },
  { id: "granulated-sugar", name: "Granulated Sugar", gramsPerCup: 200 },
  { id: "brown-sugar", name: "Brown Sugar (packed)", gramsPerCup: 220 },
  { id: "powdered-sugar", name: "Powdered Sugar", gramsPerCup: 120 },
  { id: "butter", name: "Butter", gramsPerCup: 227 },
  { id: "milk", name: "Milk", gramsPerCup: 240 },
  { id: "honey", name: "Honey", gramsPerCup: 340 },
  { id: "cocoa-powder", name: "Cocoa Powder", gramsPerCup: 85 },
];

const getCategory = (unit) => (VOLUME_UNITS.includes(unit) ? "volume" : "weight");

const roundTo = (value, decimals) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

const MeasurementConverter = () => {
  const [amount, setAmount] = useState(1.5);
  const [fromUnit, setFromUnit] = useState("cup");
  const [toUnit, setToUnit] = useState("g");
  const [selectedIngredientId, setSelectedIngredientId] = useState(INGREDIENTS[0].id);
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState("");
  const [isIngredientListOpen, setIsIngredientListOpen] = useState(false);
  const [result, setResult] = useState(null);

  const fromCategory = getCategory(fromUnit);
  const toCategory = getCategory(toUnit);
  const needsIngredient = fromCategory !== toCategory;

  const selectedIngredient = INGREDIENTS.find((item) => item.id === selectedIngredientId);

  const filteredIngredients = INGREDIENTS.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(ingredientSearchTerm.toLowerCase())
  );

  const handleIngredientFocus = () => {
    setIngredientSearchTerm("");
    setIsIngredientListOpen(true);
  };

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredientId(ingredient.id);
    setIngredientSearchTerm("");
    setIsIngredientListOpen(false);
  };

  const handleConvert = () => {
    const numericAmount = Number(amount);

    if (numericAmount <= 0) {
      toast.error("Amount must be greater than zero.");
      setResult(null);
      return;
    }

    if (needsIngredient && !selectedIngredient) {
      toast.error("Please select an ingredient.");
      setResult(null);
      return;
    }

    let convertedAmount;

    if (!needsIngredient && fromCategory === "volume") {
      const amountInMl = numericAmount * ML_PER_UNIT[fromUnit];
      convertedAmount = amountInMl / ML_PER_UNIT[toUnit];
    } else if (!needsIngredient && fromCategory === "weight") {
      const amountInGrams = numericAmount * GRAMS_PER_UNIT[fromUnit];
      convertedAmount = amountInGrams / GRAMS_PER_UNIT[toUnit];
    } else {
      const gramsPerMl = selectedIngredient.gramsPerCup / ML_PER_UNIT.cup;

      if (fromCategory === "volume") {
        const amountInMl = numericAmount * ML_PER_UNIT[fromUnit];
        const amountInGrams = amountInMl * gramsPerMl;
        convertedAmount = amountInGrams / GRAMS_PER_UNIT[toUnit];
      } else {
        const amountInGrams = numericAmount * GRAMS_PER_UNIT[fromUnit];
        const amountInMl = amountInGrams / gramsPerMl;
        convertedAmount = amountInMl / ML_PER_UNIT[toUnit];
      }
    }

    setResult({
      fromAmount: numericAmount,
      fromLabel: UNIT_LABELS[fromUnit],
      toAmount: roundTo(convertedAmount, 2),
      toLabel: UNIT_LABELS[toUnit],
      ingredientName: needsIngredient ? selectedIngredient.name : null,
      commonConversions: needsIngredient
        ? [
            { label: "1 cup", grams: roundTo(selectedIngredient.gramsPerCup, 1) },
            { label: "½ cup", grams: roundTo(selectedIngredient.gramsPerCup / 2, 1) },
            { label: "1 tbsp", grams: roundTo(selectedIngredient.gramsPerCup / 16, 1) },
            { label: "1 tsp", grams: roundTo(selectedIngredient.gramsPerCup / 48, 1) },
          ]
        : null,
    });
  };

  return (
    <UserLayout>
      <Heros
        heading={heading}
        image={measurementConverter}
        alt="Measuring cups and spoons on a kitchen counter"
      />

      <div className="max-w-2xl mx-auto px-6 lg:px-0 pb-20 pt-12">
        <ToolCard title="Measurement Converter" actionText="Convert" onAction={handleConvert}>
          <div>
            <label className="block text-sm font-medium text-primary mb-1">Convert</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                min="0"
                step="0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full sm:w-28 border border-border rounded-xl px-4 py-2 text-primary focus:outline-none focus:ring-1"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-2 text-primary focus:outline-none focus:ring-1"
              >
                <optgroup label="Volume">
                  {VOLUME_UNITS.map((unit) => (
                    <option key={unit} value={unit}>
                      {UNIT_LABELS[unit]}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Weight">
                  {WEIGHT_UNITS.map((unit) => (
                    <option key={unit} value={unit}>
                      {UNIT_LABELS[unit]}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-1">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-2 text-primary focus:outline-none focus:ring-1"
            >
              <optgroup label="Volume">
                {VOLUME_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {UNIT_LABELS[unit]}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Weight">
                {WEIGHT_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {UNIT_LABELS[unit]}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {needsIngredient && (
            <div className="relative">
              <label className="block text-sm font-medium text-primary mb-1">Ingredient</label>
              <input
                type="text"
                value={isIngredientListOpen ? ingredientSearchTerm : selectedIngredient?.name || ""}
                onChange={(e) => setIngredientSearchTerm(e.target.value)}
                onFocus={handleIngredientFocus}
                onBlur={() => setTimeout(() => setIsIngredientListOpen(false), 150)}
                placeholder="Search ingredient..."
                className="w-full border border-border rounded-xl px-4 py-2 text-primary focus:outline-none focus:ring-1"
              />

              {isIngredientListOpen && filteredIngredients.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-border rounded-xl shadow-md max-h-48 overflow-y-auto">
                  {filteredIngredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectIngredient(ingredient)}
                        className="w-full text-left px-4 py-2 text-text hover:bg-border/40"
                      >
                        {ingredient.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {isIngredientListOpen && filteredIngredients.length === 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-border rounded-xl shadow-md px-4 py-2 text-text text-sm">
                  No matching ingredient found.
                </div>
              )}
            </div>
          )}
        </ToolCard>

        {result && (
          <div className="mt-6 bg-white border border-border rounded-3xl shadow-md p-6 sm:p-8">
            <div className="text-center">
              <p className="text-3xl font-semibold text-primary">
                {result.toAmount} {result.toLabel}
              </p>
              <p className="text-text text-sm mt-1">
                {result.fromAmount} {result.fromLabel}
                {result.ingredientName ? ` of ${result.ingredientName}` : ""}
              </p>
            </div>

            {result.commonConversions && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-primary mb-3">
                  Common conversions — {result.ingredientName}
                </h3>
                <ul className="space-y-2">
                  {result.commonConversions.map((item) => (
                    <li key={item.label} className="flex justify-between text-text text-sm">
                      <span>{item.label}</span>
                      <span>{item.grams} g</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

export default MeasurementConverter;
import { useState } from "react";
import { toast } from "react-toastify";

import UserLayout from "../../../layout/UserLayout";
import Heros from "../../../component/Heros";
import ToolCard from "../../../component/tools/ToolCard";
import RelatedTools from "../../../component/tools/RelatedTools";

// import measurementConverter from "../../../assets/images/measurement-converter.jpg";

import {
  FiRepeat,
  FiPackage,
  FiSliders,
} from "react-icons/fi";

const heading = {
  span: "Measurement Converter",
  title: "Make measurements make sense.",
  desc: "Convert cups, grams, ounces, and more with ease — so you can follow recipes without second-guessing the measurements.",
};

const UNIT_GROUPS = {
  Volume: ["tsp", "tbsp", "cup", "ml", "l"],
  Weight: ["g", "kg", "oz", "lb"],
};

const CONVERSIONS = {
  tsp: {
    tbsp: 1 / 3,
    cup: 1 / 48,
    ml: 4.92892,
    l: 0.00492892,
  },
  tbsp: {
    tsp: 3,
    cup: 1 / 16,
    ml: 14.7868,
    l: 0.0147868,
  },
  cup: {
    tsp: 48,
    tbsp: 16,
    ml: 236.588,
    l: 0.236588,
  },
  ml: {
    tsp: 1 / 4.92892,
    tbsp: 1 / 14.7868,
    cup: 1 / 236.588,
    l: 0.001,
  },
  l: {
    tsp: 202.884,
    tbsp: 67.628,
    cup: 4.22675,
    ml: 1000,
  },

  g: {
    kg: 0.001,
    oz: 0.035274,
    lb: 0.00220462,
  },
  kg: {
    g: 1000,
    oz: 35.274,
    lb: 2.20462,
  },
  oz: {
    g: 28.3495,
    kg: 0.0283495,
    lb: 0.0625,
  },
  lb: {
    g: 453.592,
    kg: 0.453592,
    oz: 16,
  },
};

const MeasurementConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromUnit, setFromUnit] = useState("cup");
  const [toUnit, setToUnit] = useState("ml");
  const [result, setResult] = useState(null);

  const getGroup = (unit) => {
    return Object.keys(UNIT_GROUPS).find((group) =>
      UNIT_GROUPS[group].includes(unit)
    );
  };

  const handleConvert = () => {
    const value = Number(amount);

    if (!value || value <= 0) {
      toast.error("Please enter an amount greater than zero.");
      setResult(null);
      return;
    }

    if (fromUnit === toUnit) {
      setResult(value);
      return;
    }

    const fromGroup = getGroup(fromUnit);
    const toGroup = getGroup(toUnit);

    if (fromGroup !== toGroup) {
      toast.error("Please choose units from the same measurement type.");
      setResult(null);
      return;
    }

    const converted = value * CONVERSIONS[fromUnit][toUnit];

    const rounded =
      Math.round(converted * 100) / 100;

    setResult(rounded);
  };

  return (
    <UserLayout>
      <Heros
        heading={heading}
        image={measurementConverter}
        alt="Baking ingredients being measured"
      />

<section className="bg-light-bg py-12 px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
  <div className="mx-auto w-full">

          {/* Tool Card */}
          <ToolCard
            title="Measurement Converter"
            actionText="Convert Measurement"
            onAction={handleConvert}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:items-end">

              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  Amount
                </label>

                <input
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="Enter amount"
                />
              </div>

              {/* From */}
              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  From
                </label>

                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                >
                  {Object.entries(UNIT_GROUPS).map(
                    ([group, units]) => (
                      <optgroup key={group} label={group}>
                        {units.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </optgroup>
                    )
                  )}
                </select>
              </div>

              {/* To */}
              <div>
                <label className="mb-2 block text-sm font-medium text-primary">
                  To
                </label>

                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                >
                  {Object.entries(UNIT_GROUPS).map(
                    ([group, units]) => (
                      <optgroup key={group} label={group}>
                        {units.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </optgroup>
                    )
                  )}
                </select>
              </div>
            </div>
          </ToolCard>

          {/* Result Card */}
          {result !== null && (
            <div className="mx-auto mt-6 max-w-7xl rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
              <h2
                className="mb-6 text-center text-2xl font-semibold text-primary"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Conversion Result
              </h2>

              <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5">
                <span className="text-lg text-primary">
                  {amount} {fromUnit}
                </span>

                <FiRepeat
                  className="text-accent"
                  size={20}
                />

                <span className="text-xl font-semibold text-primary">
                  {result} {toUnit}
                </span>
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

export default MeasurementConverter;
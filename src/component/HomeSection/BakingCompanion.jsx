import { NavLink } from "react-router-dom";
import { FiSliders, FiRepeat, FiPackage } from "react-icons/fi";
import SectionHeads from "../SectionHeads";

const heading = {
  span: "BAKING COMPANION",
  title: "Little tools, big difference",
  desc: "Handy tools to simplify every step of your baking journey.",
};

const tools = [
  {
    icon: FiSliders,
    name: "Recipe Scaler",
    desc: "Adjust any recipe up or down to the exact batch size you need.",
    to: "/tools/recipe-scaler",
  },
  {
    icon: FiRepeat,
    name: "Measurement Converter",
    desc: "Switch between cups, grams, and ounces without doing the math.",
    to: "/tools/measurement-converter",
  },
  {
    icon: FiPackage,
    name: "Pantry Substitutions",
    desc: "Find the right swap when you're missing an ingredient.",
    to: "/tools/pantry-substitutions",
  },
];

const BakingCompanion = () => {
  return (
    <section className="bg-light-bg px-6 py-16 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <SectionHeads heading={heading} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {tools.map((tool) => (
          <NavLink
            key={tool.to}
            to={tool.to}
            className="rounded-2xl bg-border p-8 text-center transition hover:bg-tag-bg"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-light-bg">
              <tool.icon
                className="text-primary"
                size={24}
              />
            </div>

            <h3 className="mb-3 font-serif text-xl font-bold text-primary">
              {tool.name}
            </h3>

            <p className="text-sm text-accent">
              {tool.desc}
            </p>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default BakingCompanion;
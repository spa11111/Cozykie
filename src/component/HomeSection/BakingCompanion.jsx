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
    <section className="bg-light-bg px-6 lg:px-10 py-16">
      <div className="max-w-7xl mx-auto">
        <SectionHeads heading={heading} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <NavLink
              key={tool.to}
              to={tool.to}
              className="bg-border  rounded-2xl p-8 text-center hover:bg-tag-bg transition"
            >
              <div className="w-14 h-14 rounded-full bg-light-bg flex items-center justify-center mx-auto mb-5">
                <tool.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-3">
                {tool.name}
              </h3>
              <p className="text-sm text-accent">{tool.desc}</p>
            </NavLink>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BakingCompanion;
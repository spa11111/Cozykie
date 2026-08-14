import { NavLink } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const blockColors = [
  "bg-border hover:bg-tag-bg",
];
const RelatedTools = ({ tools }) => {
  return (
    <section>
      <h3
        className="text-xl text-center font-bold text-primary mb-5"
      >
        Need something else?
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {tools.map((tool, i) => {
          const Icon = tool.icon;

          return (
            <NavLink
              key={tool.path}
              to={tool.path}
              className={`group flex flex-col justify-between text-center rounded-2xl px-6 py-6 transition-colors duration-300 ${blockColors[i % blockColors.length]}`}
            >
              <div>
                {Icon && (
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white text-primary mb-4">
                    <Icon size={18} />
                  </span>
                )}

                <h4
                  className="text-lg font-medium text-primary mb-2"
                >
                  {tool.name}
                </h4>
              </div>

            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedTools;
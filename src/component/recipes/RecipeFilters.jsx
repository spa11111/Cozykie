import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

const FILTERS = [
  "All",
  "Trending",
  "Cozy",
  "Seasonal",
  "Chocolate",
  "Quick & Easy",
  "Community",
];

const RecipeFilters = ({ activeFilter, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (filter) => {
    onChange(filter);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-56" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 bg-white border border-border rounded-xl px-5 py-3 text-sm font-semibold text-primary hover:border-accent transition-colors duration-300"
      >
        <span>
          <span className="text-text font-normal mr-1.5">Filter:</span>
          {activeFilter}
        </span>
        <FiChevronDown
          size={16}
          className={`text-accent transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-border rounded-xl shadow-lg overflow-hidden">
          {FILTERS.map((filter) => {
            const isActive = filter === activeFilter;

            return (
              <button
                key={filter}
                onClick={() => handleSelect(filter)}
                className={`w-full flex items-center justify-between px-5 py-3 text-sm text-left transition-colors duration-200 ${
                  isActive
                    ? "bg-tag-bg text-primary font-semibold"
                    : "text-primary hover:bg-tag-bg/50"
                }`}
              >
                {filter}
                {isActive && <FiCheck size={15} className="text-accent" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecipeFilters;
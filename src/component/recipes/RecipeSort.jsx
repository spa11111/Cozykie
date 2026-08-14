import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

const SORT_OPTIONS = [
  { value: "rating", label: "Highest Rated" },
  { value: "az", label: "A – Z" },
  { value: "price", label: "Price: Low to High" },
  { value: "difficulty", label: "Difficulty: Easy to Hard" },
  { value: "quickest", label: "Quickest" },
  { value: "stock", label: "Most Available" },
];

const RecipeSort = ({ activeSort, onChange }) => {
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

  const activeLabel = SORT_OPTIONS.find((o) => o.value === activeSort)?.label;

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-56" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 bg-white border border-border rounded-xl px-5 py-3 text-sm font-semibold text-primary hover:border-accent transition-colors duration-300"
      >
        <span>
          <span className="text-text font-normal mr-1.5">Sort:</span>
          {activeLabel}
        </span>
        <FiChevronDown
          size={16}
          className={`text-accent transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full right-0 bg-white border border-border rounded-xl shadow-lg overflow-hidden">
          {SORT_OPTIONS.map((option) => {
            const isActive = option.value === activeSort;

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center justify-between px-5 py-3 text-sm text-left transition-colors duration-200 ${
                  isActive
                    ? "bg-tag-bg text-primary font-semibold"
                    : "text-primary hover:bg-tag-bg/50"
                }`}
              >
                {option.label}
                {isActive && <FiCheck size={15} className="text-accent" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecipeSort;
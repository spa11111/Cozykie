const CollectionFilter = ({ filters, activeFilter, onChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {filters.map((filter) => {
        const isActive = filter === activeFilter;

        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`whitespace-nowrap text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-300 ${
              isActive
                ? "bg-primary text-white"
                : "bg-tag-bg hover:text-white hover:bg-accent"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

export default CollectionFilter;
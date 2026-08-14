const RecipeMeta = ({ prepTime, bakeTime, totalTime, difficulty, servings }) => {
  const items = [
    { label: "Prep", value: prepTime },
    { label: "Bake", value: bakeTime },
    { label: "Total", value: totalTime },
    { label: "Difficulty", value: difficulty },
    { label: "Servings", value: servings },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 border-y border-border divide-y sm:divide-y-0 sm:divide-x divide-border">
      {items.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center text-center py-6 px-4">
          <span className="text-xs uppercase tracking-wide text-text mb-1.5">
            {label}
          </span>
          <span className="text-base font-semibold text-primary">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default RecipeMeta;
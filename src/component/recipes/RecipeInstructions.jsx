const RecipeInstructions = ({ instructions }) => {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-primary mb-5"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        How to Make It
      </h2>

      <div className="space-y-6">
        {instructions.map((step, i) => (
          <div key={i} className="flex gap-5">
            <span
              className="flex-shrink-0 text-2xl font-bold text-accent/40 w-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-sm text-text leading-relaxed pt-1.5">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeInstructions;
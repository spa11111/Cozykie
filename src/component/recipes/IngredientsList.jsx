const IngredientsList = ({ ingredients }) => {
  return (
    <div>
      <h2
        className="text-2xl font-bold text-primary mb-5"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Ingredients
      </h2>

      <ul className="divide-y divide-border">
        {ingredients.map((item, i) => (
          <li key={i} className="py-3 text-sm text-text">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsList;
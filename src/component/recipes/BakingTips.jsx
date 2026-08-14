const BakingTips = ({ tips }) => {
  return (
    <div className="border-t border-border pt-8">
      <h3
        className="text-lg font-bold text-primary mb-4"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Baking Tips
      </h3>

      <ul className="space-y-2.5">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-text">
            <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BakingTips;
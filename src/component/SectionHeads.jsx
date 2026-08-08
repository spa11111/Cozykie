const SectionHeads = ({ heading }) => {
  return (
    <div className="text-center mb-14">
      <span className="block text-xs uppercase tracking-[3px] font-semibold text-accent mb-3">
        {heading.span}
      </span>

      <h2
        className="text-4xl font-semibold text-primary mb-4"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {heading.title}
      </h2>

      <p className="text-text text-base">
        {heading.desc}
      </p>
    </div>
  );
};

export default SectionHeads;
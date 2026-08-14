const ToolCard = ({ title, actionText, onAction, children }) => {
  return (
    <div className="mx-auto mt-6 max-w-7xl rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">

      <h2
        className="mb-8 text-center text-2xl font-semibold text-primary sm:text-3xl"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {title}
      </h2>

      <div className="space-y-7">
        {children}
      </div>

      <button
        type="button"
        onClick={onAction}
        className="mt-9 w-full rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent"
      >
        {actionText}
      </button>

    </div>
  );
};

export default ToolCard;
import React from "react";

// Reusable visual container shared by all three tools.
// Contains NO tool-specific logic — only layout, styling, and a primary action button.
const ToolCard = ({ title, actionText, onAction, children }) => {
  return (
    <div className="w-full rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
      {/* Card title */}
      <h2 className="mb-6 text-center text-xl font-semibold text-primary sm:text-2xl">
        {title}
      </h2>

      {/* Tool-specific content lives here */}
      <div className="space-y-5">{children}</div>

      {/* Full-width primary action button */}
      <button
        type="button"
        onClick={onAction}
        className="mt-8 w-full rounded-2xl bg-primary px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-accent"
      >
        {actionText}
      </button>
    </div>
  );
};

export default ToolCard;
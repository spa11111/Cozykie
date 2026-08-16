import { FiPlus, FiTrash2 } from "react-icons/fi";

const DynamicListInput = ({ label, items, onChange, placeholder }) => {
  const handleItemChange = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...items, ""]);
  };

  const handleRemove = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-primary mb-2">
        {label}
      </label>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
              className="flex-1 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="w-9 h-9 flex items-center justify-center rounded-full text-text hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
              aria-label={`Remove ${label} ${index + 1}`}
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-primary transition-colors"
      >
        <FiPlus size={14} />
        Add {label.replace(/s$/, "")}
      </button>
    </div>
  );
};

export default DynamicListInput;
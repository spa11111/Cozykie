import { FiX } from "react-icons/fi";

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-white">
          <h3 className="font-semibold text-primary">{title}</h3>
          <button onClick={onClose} className="text-text hover:text-primary transition-colors">
            <FiX size={18} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
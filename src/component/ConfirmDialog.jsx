import Modal from "./Modal";

const ConfirmDialog = ({ title, message, confirmLabel = "Delete", onConfirm, onCancel }) => {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm text-text mb-6">{message}</p>

      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="text-sm font-medium text-text border border-border rounded-full px-5 py-2.5 hover:border-primary hover:text-primary transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="text-sm font-semibold text-white bg-primary rounded-full px-5 py-2.5 hover:bg-accent transition-colors"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
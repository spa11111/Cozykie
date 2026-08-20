import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiPlus, FiTrash2, FiX, FiLock, FiGlobe, FiArrowUp, FiArrowDown, FiEdit2 } from "react-icons/fi";
import {
  getJournalEntries,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from "../../services/api";
import {
  journalLoaded,
  addJournalEntry,
  updateJournalEntryAction,
  deleteJournalEntryAction,
} from "../../redux/actions/journal.actions";
import Modal from "../../component/Modal";
import ConfirmDialog from "../../component/ConfirmDialog";
import UserLayout from "../../layout/UserLayout";
import Login from "../auth/Login";


const emptyForm = { title: "", note: "", recipe: "", rating: "", isPublic: false };

const Journal = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const entries = useSelector((state) => state.journal.entries);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    if (!user) return;

    const loadEntries = async () => {
      const data = await getJournalEntries(user.id);
      dispatch(journalLoaded(data));
    };

    loadEntries();
  }, [user?.id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEdit = (entry) => {
    setEditingId(entry.id);
    setFormData({
      title: entry.title,
      note: entry.note,
      recipe: entry.recipe,
      rating: entry.rating,
      isPublic: entry.isPublic,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (editingId) {
      const updated = await updateJournalEntry(editingId, formData);
      dispatch(updateJournalEntryAction(updated));
    } else {
      const newEntry = {
        ...formData,
        userId: user.id,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        createdAt: Date.now(),
      };
      const created = await createJournalEntry(newEntry);
      dispatch(addJournalEntry(created));
    }

    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setSubmitting(false);
  };

  const confirmDelete = async () => {
    await deleteJournalEntry(deleteTarget.id);
    dispatch(deleteJournalEntryAction(deleteTarget.id));
    setDeleteTarget(null);
  };

  const sortedEntries = [...entries].sort((a, b) => {
    return sortOrder === "newest"
      ? (b.createdAt || 0) - (a.createdAt || 0)
      : (a.createdAt || 0) - (b.createdAt || 0);
  });

  if (!user) {
    return (
      <Login />
    );
  }

  return (
    <UserLayout>
      <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[3px] font-semibold text-accent">
              Your Kitchen
            </span>
            <h1
              className="text-3xl sm:text-4xl font-bold text-primary mt-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Baking Journal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
              }
              className="inline-flex items-center gap-2 text-sm font-medium text-primary border border-border rounded-full px-4 py-2.5 hover:border-accent hover:text-accent transition-colors"
            >
              {sortOrder === "newest" ? <FiArrowDown size={14} /> : <FiArrowUp size={14} />}
              {sortOrder === "newest" ? "Newest first" : "Oldest first"}
            </button>

            <button
              onClick={openCreate}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary rounded-full px-6 py-3.5 hover:bg-accent transition-colors duration-300"
            >
              <FiPlus size={15} />
              New Entry
            </button>
          </div>
        </div>
      </section>

      <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-16">
        {sortedEntries.length === 0 ? (
          <p className="text-text text-center py-16">
            No entries yet — log your first bake above.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {sortedEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border border-border rounded-2xl p-6 relative"
              >
                <div className="absolute top-6 right-6 flex items-center gap-3">
                  <button
                    onClick={() => openEdit(entry)}
                    className="text-text hover:text-accent transition-colors"
                    aria-label="Edit entry"
                  >
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(entry)}
                    className="text-text hover:text-red-500 transition-colors"
                    aria-label="Delete entry"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-text uppercase tracking-wide">
                    {entry.date}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      entry.isPublic
                        ? "bg-accent/10 text-accent"
                        : "bg-primary/5 text-text"
                    }`}
                  >
                    {entry.isPublic ? <FiGlobe size={11} /> : <FiLock size={11} />}
                    {entry.isPublic ? "Public" : "Private"}
                  </span>
                </div>

                <h3
                  className="text-lg font-semibold text-primary mt-1 mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {entry.title}
                </h3>

                <p className="text-sm text-text leading-relaxed mb-3">
                  {entry.note}
                </p>

                <div className="flex flex-wrap gap-3 text-xs text-text">
                  {entry.recipe && (
                    <span className="bg-primary/5 px-3 py-1 rounded-full">
                      {entry.recipe}
                    </span>
                  )}
                  {entry.rating && (
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">
                      {entry.rating}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

            {showForm && (
        <Modal title={editingId ? "Edit Entry" : "New Entry"} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-primary mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Entry title"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                required
              />
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-semibold text-primary mb-2">
                Note
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="What did you learn or try?"
                rows={4}
                className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <label htmlFor="recipe" className="block text-sm font-semibold text-primary mb-2">
                  Recipe
                </label>
                <input
                  id="recipe"
                  type="text"
                  name="recipe"
                  value={formData.recipe}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div className="w-full">
                <label htmlFor="rating" className="block text-sm font-semibold text-primary mb-2">
                  Rating
                </label>
                <input
                  id="rating"
                  type="text"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="e.g. 5/5 Batch"
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-text cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, isPublic: e.target.checked }))
                }
                className="w-4 h-4 rounded border-accent text-accent"
              />
              Make this entry public
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full text-sm font-semibold text-white bg-accent rounded-full px-6 py-3 hover:bg-primary transition-colors disabled:opacity-60"
            >
              {submitting ? "Saving..." : editingId ? "Save Changes" : "Save Entry"}
            </button>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Entry"
          message={`Are you sure you want to delete "${deleteTarget.title}"? This can't be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </UserLayout>
  );
};

export default Journal;
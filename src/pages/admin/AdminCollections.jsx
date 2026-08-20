import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiTrash2, FiEdit2, FiArrowUp, FiArrowDown, FiPlus } from "react-icons/fi";
import {
  getCollections, createCollection, updateCollection, deleteCollection, getAllRecipesAdmin,
} from "../../services/api";
import Modal from "../../component/Modal";
import ConfirmDialog from "../../component/ConfirmDialog";
import ImagePicker from "../../component/ImagePicker";

const emptyForm = { name: "", tag: "", description: "", image: "" };

const AdminCollections = () => {
  const [collections, setCollections] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [sortOrder, setSortOrder] = useState("az");

  useEffect(() => {
    Promise.all([getCollections(), getAllRecipesAdmin()]).then(([c, r]) => {
      setCollections(c);
      setRecipes(r);
    });
  }, []);

  const countForTag = (tag) => recipes.filter((r) => r.category === tag).length;

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEdit = (c) => {
    setEditingId(c.id);
    setFormData({ name: c.name, tag: c.tag, description: c.description, image: c.image });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, recipeCount: countForTag(formData.tag) };

    if (editingId) {
      const updated = await updateCollection(editingId, payload);
      setCollections((prev) => prev.map((c) => (c.id === editingId ? { ...c, ...updated } : c)));
      toast.success("Collection updated.");
    } else {
      const slug = formData.name.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
      const created = await createCollection({ ...payload, slug });
      setCollections((prev) => [...prev, created]);
      toast.success("Collection created.");
    }

    setShowForm(false);
    setFormData(emptyForm);
  };

  const confirmDelete = async () => {
    await deleteCollection(deleteTarget.id);
    setCollections((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    toast.success("Collection deleted.");
    setDeleteTarget(null);
  };

  const sortedCollections = [...collections].sort((a, b) => {
    return sortOrder === "az"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-3xl font-semibold text-primary"
        >
          Collections
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSortOrder((prev) => (prev === "az" ? "za" : "az"))}
            className="inline-flex items-center gap-2 text-sm font-medium bg-light-bg text-primary border border-border rounded-full px-4 py-2.5 hover:border-accent hover:text-accent transition-colors"
          >
            {sortOrder === "az" ? <FiArrowDown size={14} /> : <FiArrowUp size={14} />}
            {sortOrder === "az" ? "A – Z" : "Z – A"}
          </button>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-primary rounded-full px-5 py-3 hover:bg-accent transition-colors"
          >
            <FiPlus size={15} />
            New Collection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedCollections.map((c) => (
          <div key={c.id} className="bg-white border border-border rounded-2xl overflow-hidden">
            <img src={c.image} alt={c.name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-primary">{c.name}</h3>
              <p className="text-xs text-text mt-1">{countForTag(c.tag)} recipes</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openEdit(c)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary border border-border rounded-full px-3 py-1.5 hover:bg-accent/70 hover:text-white transition-colors"
                >
                  <FiEdit2 size={11} /> Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(c)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-text border border-border rounded-full px-3 py-1.5  hover:bg-primary hover:text-white transition-colors"
                >
                  <FiTrash2 size={11} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <Modal title={editingId ? "Edit Collection" : "New Collection"} onClose={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Name
              </label>
              <input
                name="name" value={formData.name} onChange={handleChange}
                required
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Tag
              </label>
              <input
                name="tag" value={formData.tag} onChange={handleChange}
                placeholder="e.g. Cozy, Seasonal" required
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Description
              </label>
              <textarea
                name="description" value={formData.description} onChange={handleChange}
                rows={2} required
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <ImagePicker name="image" value={formData.image} onChange={handleChange} label="Image" />

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Recipe Count
              </label>
              <div className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-primary/5 text-text">
                {formData.tag
                  ? `${countForTag(formData.tag)} recipe${countForTag(formData.tag) === 1 ? "" : "s"} tagged "${formData.tag}"`
                  : "Set a tag to see the count"}
              </div>
              <p className="text-xs text-text/50 mt-1.5">
                Calculated automatically from recipes — not editable.
              </p>
            </div>

            <button
              type="submit"
              className="w-full text-sm font-semibold text-white bg-accent rounded-full px-6 py-3 hover:bg-primary transition-colors"
            >
              {editingId ? "Save Changes" : "Create"}
            </button>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Collection"
          message={`Are you sure you want to delete "${deleteTarget.name}"? This can't be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminCollections;
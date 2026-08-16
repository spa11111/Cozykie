import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiTrash2, FiEdit2, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { getAllUsers, updateUser, deleteUser } from "../../services/api";
import Modal from "../../component/Modal";
import ConfirmDialog from "../../component/ConfirmDialog";

const emptyForm = { name: "", email: "", role: "user" };

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [sortOrder, setSortOrder] = useState("az");

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const openEdit = (u) => {
    setEditingId(u.id);
    setFormData({ name: u.name, email: u.email, role: u.role });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await updateUser(editingId, formData);
    setUsers((prev) => prev.map((u) => (u.id === editingId ? { ...u, ...updated } : u)));
    setShowForm(false);
    setEditingId(null);
    toast.success("User updated.");
  };

  const confirmDelete = async () => {
    await deleteUser(deleteTarget.id);
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    toast.success("User deleted.");
    setDeleteTarget(null);
  };

  const sortedUsers = [...users].sort((a, b) => {
    return sortOrder === "az"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-3xl font-bold text-primary"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Users
        </h1>

        <button
          onClick={() => setSortOrder((prev) => (prev === "az" ? "za" : "az"))}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary border border-border rounded-full px-4 py-2.5 hover:border-accent hover:text-accent transition-colors"
        >
          {sortOrder === "az" ? <FiArrowDown size={14} /> : <FiArrowUp size={14} />}
          {sortOrder === "az" ? "A – Z" : "Z – A"}
        </button>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-text">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-0">
                <td className="px-5 py-3 font-medium text-primary">{u.name}</td>
                <td className="px-5 py-3 text-text">{u.email}</td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      u.role === "admin" ? "bg-primary text-white" : "bg-primary/5 text-text"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-3 text-right space-x-3">
                  <button onClick={() => openEdit(u)} className="text-text hover:text-accent">
                    <FiEdit2 size={14} className="inline" />
                  </button>
                  <button onClick={() => setDeleteTarget(u)} className="text-text hover:text-red-500">
                    <FiTrash2 size={14} className="inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <Modal title="Edit User" onClose={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full text-sm font-semibold text-white bg-accent rounded-full px-6 py-3 hover:bg-primary transition-colors"
            >
              Save Changes
            </button>
          </form>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete User"
          message={`Are you sure you want to delete "${deleteTarget.name}"? This can't be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminUsers;
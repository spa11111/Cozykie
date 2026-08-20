import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiFlag, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { getAllRecipesAdmin, reportRecipe } from "../../services/api";
import Modal from "../../component/Modal";

const getStockStatus = (stock) => {
  if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700" };
  if (stock <= 5) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-700" };
  return { label: "In Stock", color: "bg-green-100 text-green-700" };
};

const AdminRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [sortOrder, setSortOrder] = useState("az");
  const [reportTarget, setReportTarget] = useState(null);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getAllRecipesAdmin().then(setRecipes);
  }, []);

  const openReport = (recipe) => {
    setReportTarget(recipe);
    setReason("");
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const updated = await reportRecipe(reportTarget.id, reason);
    setRecipes((prev) =>
      prev.map((r) => (r.id === reportTarget.id ? { ...r, ...updated } : r))
    );

    toast.success("Recipe flagged for review.");
    setReportTarget(null);
    setSubmitting(false);
  };

  const sortedRecipes = [...recipes].sort((a, b) => {
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
          Recipes
        </h1>

        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "az" ? "za" : "az"))
          }
          className="inline-flex items-center gap-2 text-sm bg-light-bg font-medium text-primary border border-border rounded-full px-4 py-2.5 hover:border-accent hover:text-accent transition-colors"
        >
          {sortOrder === "az" ? <FiArrowDown size={14} /> : <FiArrowUp size={14} />}
          {sortOrder === "az" ? "A – Z" : "Z – A"}
        </button>
      </div>

      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-text">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Author ID</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRecipes.map((r) => {
              const status = getStockStatus(r.stock);
              return (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-medium text-primary">{r.name}</td>
                  <td className="px-5 py-3 text-text text-xs">{r.authorId || "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                      {r.reported && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                          Flagged
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => openReport(r)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-text border border-border rounded-full px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
                    >
                      <FiFlag size={12} />
                      Report
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {reportTarget && (
        <Modal title={`Report "${reportTarget.name}"`} onClose={() => setReportTarget(null)}>
          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="Why is this recipe being flagged?"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full text-sm font-semibold text-white bg-primary rounded-full px-6 py-3 hover:bg-accent transition-colors disabled:opacity-60"
            >
              {submitting ? "Flagging..." : "Flag for Review"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminRecipes;
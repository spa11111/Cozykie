import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiFlag, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { getAllOrders, updateOrderStatus, reportOrder } from "../../services/api";
import Modal from "../../component/Modal";


const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [reportTarget, setReportTarget] = useState(null);
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getAllOrders().then(setOrders);
  }, []);


  const openReport = (order) => {
    setReportTarget(order);
    setReason("");
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const updated = await reportOrder(reportTarget.id, reason);
    setOrders((prev) =>
      prev.map((o) => (o.id === reportTarget.id ? { ...o, ...updated } : o))
    );

    toast.success("Order flagged for review.");
    setReportTarget(null);
    setSubmitting(false);
  };

  const sortedOrders = [...orders].sort((a, b) => {
    return sortOrder === "newest"
      ? (b.createdAt || 0) - (a.createdAt || 0)
      : (a.createdAt || 0) - (b.createdAt || 0);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-3xl font-bold text-primary"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Orders
        </h1>

        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))
          }
          className="inline-flex items-center gap-2 text-sm font-medium text-primary border border-border rounded-full px-4 py-2.5 hover:border-accent hover:text-accent transition-colors"
        >
          {sortOrder === "newest" ? <FiArrowDown size={14} /> : <FiArrowUp size={14} />}
          {sortOrder === "newest" ? "Newest first" : "Oldest first"}
        </button>
      </div>

      <div className="bg-white border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-text">
              <th className="px-5 py-3 font-medium">Recipe</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Qty</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0">
                <td className="px-5 py-3 font-medium text-primary">{o.recipeName}</td>
                <td className="px-5 py-3 text-text">{o.fullName}</td>
                <td className="px-5 py-3 text-text">{o.quantity}</td>
                <td className="px-5 py-3 text-text">Rs. {o.total?.toLocaleString("en-IN")}</td>
                <td className="px-5 py-3">
  <div className="flex items-center gap-2">
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[o.status || "Pending"]}`}
    >
      {o.status || "Pending"}
    </span>
    {o.reported && (
      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700">
        Flagged
      </span>
    )}
  </div>
</td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => openReport(o)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-text border border-border rounded-full px-3 py-1.5 hover:border-red-400 hover:text-red-500 transition-colors"
                  >
                    <FiFlag size={12} />
                    Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reportTarget && (
        <Modal title={`Report Order — ${reportTarget.recipeName}`} onClose={() => setReportTarget(null)}>
          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Reason
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="Why is this order being flagged?"
                className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full text-sm font-semibold text-white bg-red-500 rounded-full px-6 py-3 hover:bg-red-600 transition-colors disabled:opacity-60"
            >
              {submitting ? "Flagging..." : "Flag for Review"}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminOrders;
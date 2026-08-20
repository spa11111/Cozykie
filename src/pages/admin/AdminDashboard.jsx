import { useState, useEffect } from "react";
import {
  FiUsers,
  FiFolder,
  FiShoppingBag,
  FiBook,
  FiDollarSign,
  FiAlertTriangle,
  FiTrendingUp,
} from "react-icons/fi";
import {
  getAllUsers,
  getCollections,
  getAllOrders,
  getAllRecipesAdmin,
} from "../../services/api";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white border border-border rounded-2xl p-6">
    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-3">
      <Icon className="text-primary" size={18} />
    </div>
    <div className="text-2xl font-bold text-primary">{value}</div>
    <div className="text-sm text-text">{label}</div>
  </div>
);

const SectionTitle = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2 mb-4">
    {Icon && <Icon className="text-primary" size={16} />}
    <h2 className="text-lg font-semibold text-primary">{children}</h2>
  </div>
);

const CHART_COLORS = ["#B65C3B", "#D9A15B", "#7C8B5F", "#5C6B73", "#C97B63", "#9C7A5B", "#A8845C"];

const money = (n) => `Rs. ${(n || 0).toLocaleString()}`;

const CategoryDonut = ({ data, colors }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) return null;

  let cumulative = 0;
  const stops = data.map((d, i) => {
    const startPct = (cumulative / total) * 100;
    cumulative += d.value;
    const endPct = (cumulative / total) * 100;
    return `${colors[i % colors.length]} ${startPct}% ${endPct}%`;
  });

  return (
    <div className="relative w-40 h-40 mx-auto">
      <div
        className="w-full h-full rounded-full"
        style={{ background: `conic-gradient(${stops.join(", ")})` }}
      />
      <div className="absolute inset-[17%] bg-white rounded-full flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-primary">{total}</span>
        <span className="text-[10px] text-text/60">recipes</span>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, collections: 0, orders: 0, recipes: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topRecipes, setTopRecipes] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [users, collections, orders, recipes] = await Promise.all([
        getAllUsers(),
        getCollections(),
        getAllOrders(),
        getAllRecipesAdmin(),
      ]);

      const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

      setStats({
        users: users.length,
        collections: collections.length,
        orders: orders.length,
        recipes: recipes.length,
        revenue,
      });

      setRecentOrders([...orders].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5));

      const soldMap = {};
      orders.forEach((o) => {
        if (!o.recipeSlug) return;
        if (!soldMap[o.recipeSlug]) {
          soldMap[o.recipeSlug] = {
            slug: o.recipeSlug,
            name: o.recipeName,
            image: o.recipeImage,
            quantity: 0,
            revenue: 0,
          };
        }
        soldMap[o.recipeSlug].quantity += o.quantity || 0;
        soldMap[o.recipeSlug].revenue += o.total || 0;
      });
      setTopRecipes(Object.values(soldMap).sort((a, b) => b.quantity - a.quantity).slice(0, 5));

      setLowStock(
        recipes
          .filter((r) => typeof r.stock === "number" && r.stock <= 5)
          .sort((a, b) => a.stock - b.stock)
          .slice(0, 5)
      );

      const catMap = {};
      recipes.forEach((r) => {
        const cat = r.category || "Uncategorized";
        catMap[cat] = (catMap[cat] || 0) + 1;
      });
      setCategoryData(Object.entries(catMap).map(([name, value]) => ({ name, value })));

      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-primary mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        <StatCard icon={FiUsers} label="Total Users" value={stats.users} />
        <StatCard icon={FiBook} label="Recipes" value={stats.recipes} />
        <StatCard icon={FiShoppingBag} label="Orders" value={stats.orders} />
        <StatCard icon={FiFolder} label="Collections" value={stats.collections} />
        <StatCard icon={FiDollarSign} label="Revenue" value={money(stats.revenue)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-8">
        <div className="lg:col-span-3 bg-white border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary">Recent Orders</h2>
            <span className="text-xs text-text/60">{stats.orders} total</span>
          </div>
          {loading ? (
            <p className="text-sm text-text/60">Loading...</p>
          ) : recentOrders.length === 0 ? (
            <p className="text-sm text-text/60">No orders yet.</p>
          ) : (
            <div className="divide-y divide-border">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-3 py-3">
                  <img
                    src={order.recipeImage}
                    alt={order.recipeName}
                    className="w-10 h-10 rounded-lg object-cover bg-primary/5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{order.recipeName}</p>
                    <p className="text-xs text-text/60 truncate">
                      {order.fullName} · Qty {order.quantity}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-primary">{money(order.total)}</p>
                    <p className="text-xs text-text/60">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-white border border-border rounded-2xl p-6">
          <SectionTitle>Recipes by Category</SectionTitle>
          {loading ? (
            <p className="text-sm text-text/60">Loading...</p>
          ) : categoryData.length === 0 ? (
            <p className="text-sm text-text/60">No recipes yet.</p>
          ) : (
            <>
              <CategoryDonut data={categoryData} colors={CHART_COLORS} />
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
                {categoryData.map((entry, i) => (
                  <div key={entry.name} className="flex items-center gap-1.5 text-xs text-text">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
                    />
                    {entry.name} ({entry.value})
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-border rounded-2xl p-6">
          <SectionTitle icon={FiTrendingUp}>Best Sellers</SectionTitle>
          {loading ? (
            <p className="text-sm text-text/60">Loading...</p>
          ) : topRecipes.length === 0 ? (
            <p className="text-sm text-text/60">No sales yet.</p>
          ) : (
            <div className="space-y-3">
              {topRecipes.map((r, i) => (
                <div key={r.slug} className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-primary/40 w-4">{i + 1}</span>
                  <img src={r.image} alt={r.name} className="w-9 h-9 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{r.name}</p>
                    <p className="text-xs text-text/60">{r.quantity} sold</p>
                  </div>
                  <p className="text-sm font-semibold text-primary shrink-0">{money(r.revenue)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-border rounded-2xl p-6">
          <SectionTitle icon={FiAlertTriangle}>Low Stock</SectionTitle>
          {loading ? (
            <p className="text-sm text-text/60">Loading...</p>
          ) : lowStock.length === 0 ? (
            <p className="text-sm text-text/60">Everything's well stocked.</p>
          ) : (
            <div className="space-y-3">
              {lowStock.map((r) => (
                <div key={r.id} className="flex items-center gap-3">
                  <img src={r.image} alt={r.name} className="w-9 h-9 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">{r.name}</p>
                    <p className="text-xs text-text/60">{r.category}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${
                      r.stock === 0 ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {r.stock === 0 ? "Out of stock" : `${r.stock} left`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
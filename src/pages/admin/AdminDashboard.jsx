import { useState, useEffect } from "react";
import { FiUsers, FiFolder, FiShoppingBag, FiBook } from "react-icons/fi";
import { getAllUsers, getCollections, getAllOrders, getAllRecipesAdmin } from "../../services/api";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white border border-border rounded-2xl p-6">
    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mb-3">
      <Icon className="text-primary" size={18} />
    </div>
    <div className="text-2xl font-bold text-primary">{value}</div>
    <div className="text-sm text-text">{label}</div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, collections: 0, orders: 0, recipes: 0 });

  useEffect(() => {
    const load = async () => {
      const [users, collections, orders, recipes] = await Promise.all([
        getAllUsers(),
        getCollections(),
        getAllOrders(),
        getAllRecipesAdmin(),
      ]);
      setStats({
        users: users.length,
        collections: collections.length,
        orders: orders.length,
        recipes: recipes.length,
      });
    };
    load();
  }, []);

  return (
    <div>
      <h1
        className="text-3xl font-bold text-primary mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Dashboard
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={FiUsers} label="Total Users" value={stats.users} />
        <StatCard icon={FiFolder} label="Collections" value={stats.collections} />
        <StatCard icon={FiShoppingBag} label="Orders" value={stats.orders} />
        <StatCard icon={FiBook} label="Recipes" value={stats.recipes} />
      </div>
    </div>
  );
};

export default AdminDashboard;
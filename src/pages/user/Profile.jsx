import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiEdit2,
  FiHeart,
  FiBookOpen,
  FiShoppingBag,
  FiSave,
  FiX,
  FiMail,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import {
  updateUser,
  getOrdersByUser,
  getRecipesByAuthor,
  deleteRecipe,
} from "../../services/api";
import { updateUserSuccess } from "../../redux/actions/auth.actions";
import { ordersLoaded } from "../../redux/actions/orders.actions";
import UserLayout from "../../layout/UserLayout";
import Modal from "../../component/Modal";
import ConfirmDialog from "../../component/ConfirmDialog";


const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) =>
    user ? state.favorites[user.id] || [] : []
  );
  const journalEntries = useSelector((state) =>
    state.journal.entries.filter((e) => String(e.userId) === String(user?.id))
  );
  const userOrders = useSelector((state) =>
    state.orders.orders.filter((o) => String(o.userId) === String(user?.id))
  );

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [yourRecipes, setYourRecipes] = useState([]);

  useEffect(() => {
    if (!user) return;
    const loadOrders = async () => {
      const data = await getOrdersByUser(user.id);
      dispatch(ordersLoaded(data));
    };
    loadOrders();
  }, [user?.id]);

  useEffect(() => {
    if (!user) return;
    const loadRecipes = async () => {
      const data = await getRecipesByAuthor(user.id);
      setYourRecipes(data);
    };
    loadRecipes();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1
          className="text-3xl font-bold text-primary mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Log in to view your profile
        </h1>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSave = async (e) => {
  e.preventDefault();
  setSaving(true);

  try {
    const updated = await updateUser(user.id, formData);
    dispatch(updateUserSuccess(updated));
    toast.success("Profile updated!");
    setEditing(false);
  } catch {
    toast.error("Couldn't update profile. Try again.");
  } finally {
    setSaving(false);
  }
};

const [deleteRecipeTarget, setDeleteRecipeTarget] = useState(null);

const confirmDeleteRecipe = async () => {
  await deleteRecipe(deleteRecipeTarget.id);
  setYourRecipes((prev) => prev.filter((r) => r.id !== deleteRecipeTarget.id));
  toast.success("Recipe deleted.");
  setDeleteRecipeTarget(null);
};

  return (
    <UserLayout>
      <div className="bg-light-bg min-h-screen">
        <section className="px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
            {/* LEFT — Identity card */}
<div className="lg:sticky lg:top-24 lg:self-start">
  <div className="bg-white border border-border rounded-3xl p-8">
    <div className="flex items-start justify-between mb-5">
      <div
        className="w-20 h-20 rounded-full bg-primary/5 border-2 border-accent/40 flex items-center justify-center text-3xl font-bold text-primary flex-shrink-0"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {user.name?.charAt(0).toUpperCase()}
      </div>

      <button
        onClick={() => setEditing(true)}
        className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-text hover:border-accent hover:text-accent transition-colors"
        aria-label="Edit profile"
      >
        <FiEdit2 size={14} />
      </button>
    </div>

    <h1
      className="text-2xl font-bold text-primary leading-tight mb-1"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      {user.name}
    </h1>

    <p className="text-xs uppercase tracking-[2px] font-semibold text-accent mb-4">
      {user.role === "admin" ? "Admin" : "Home Baker"}
    </p>

    <div className="flex items-center gap-2 text-sm text-text pt-4 border-t border-border">
      <FiMail size={14} className="flex-shrink-0" />
      <span className="truncate">{user.email}</span>
    </div>
  </div>
</div>

{editing && (
  <Modal title="Edit Profile" onClose={() => setEditing(false)}>
    <form onSubmit={handleSave} className="space-y-4">
     <div>
  <label className="block text-sm text-primary mb-2">
    Name
  </label>
  <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Name"
    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
    required
  />
</div>

<div>
  <label className="block text-sm  text-primary mb-2">
    Email
  </label>
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="Email"
    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
    required
  />
</div>

      <button
        type="submit"
        disabled={saving}
        className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-accent rounded-full px-6 py-3 hover:bg-primary transition-colors disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  </Modal>
)}

            {/* RIGHT — Stats + activity */}
            <div className="space-y-6">
              {/* Stat strip */}
              <div className="bg-none text-primary border border-border rounded-3xl px-6 py-5 grid grid-cols-3 divide-x divide-border">
                <NavLink
                  to="/favourite"
                  className="flex flex-col items-center gap-1 hover:opacity-70 transition-opacity px-2"
                >
                  <FiHeart className="text-accent" size={17} />
                  <span className="text-xl font-bold text-primary">
                    {favorites.length}
                  </span>
                  <span className="text-xs text-text text-center">
                    Saved Recipes
                  </span>
                </NavLink>

                <NavLink
                  to="/journal"
                  className="flex flex-col items-center gap-1 hover:opacity-70 transition-opacity px-2"
                >
                  <FiBookOpen className="text-accent" size={17} />
                  <span className="text-xl font-bold text-primary">
                    {journalEntries.length}
                  </span>
                  <span className="text-xs text-text text-center">
                    Journal Entries
                  </span>
                </NavLink>

                <div className="flex flex-col items-center gap-1 px-2">
                  <FiShoppingBag className="text-accent" size={17} />
                  <span className="text-xl font-bold text-primary">
                    {userOrders.length}
                  </span>
                  <span className="text-xs text-text text-center">
                    Orders Placed
                  </span>
                </div>
              </div>

              {/* Your Recipes */}
              <div className="bg-white border border-border rounded-3xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-primary">
                    Your Recipes
                  </h2>
                  <NavLink
                    to="/recipes/new"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-primary rounded-full px-4 py-2 hover:bg-accent transition-colors"
                  >
                    <FiPlus size={13} />
                    New Recipe
                  </NavLink>
                </div>

                {yourRecipes.length === 0 ? (
                  <p className="text-sm text-text">
                    You haven't shared any recipes yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    {yourRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="relative rounded-3xl overflow-hidden h-64 group"
                      >
                        <NavLink to={`/your-recipes`}>
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </NavLink>

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

                        {/* Category badge */}
                        {recipe.badge && (
                          <span className="absolute top-4 left-4 bg-white/90 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                            {recipe.badge}
                          </span>
                        )}

                        {/* Edit / Delete overlay actions */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <NavLink
                            to={`/recipes/${recipe.slug}/edit`}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-primary hover:bg-white transition-colors"
                            aria-label="Edit recipe"
                          >
                            <FiEdit2 size={13} />
                          </NavLink>
                          <button
  onClick={() => setDeleteRecipeTarget(recipe)}
  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-red-500 hover:bg-white transition-colors"
  aria-label="Delete recipe"
>
  <FiTrash2 size={13} />
</button>
                        </div>

                        {/* Text content */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3
                            className="text-white text-lg font-bold leading-tight mb-1"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          >
                            {recipe.name}
                          </h3>
                          <p className="text-white/80 text-xs uppercase tracking-wide font-semibold">
                            {recipe.stock} in stock
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
{/* Recent Favorites */}
{favorites.length > 0 && (
  <div className="bg-white border border-border rounded-3xl p-6">
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-lg font-bold text-primary">
        Recent Favorites
      </h2>
      <NavLink
        to="/favourite"
        className="text-xs font-semibold text-accent hover:underline"
      >
        View all
      </NavLink>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {favorites.slice(0, 4).map((recipe) => (
        <NavLink
          key={recipe.slug}
          to={`/recipes/${recipe.slug}`}
          className="rounded-2xl overflow-hidden border border-border block group"
        >
          <div className="w-full aspect-square bg-primary/5 overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.name}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </NavLink>
      ))}
    </div>
  </div>
)}

              {/* Recent Journal Entries */}
              {journalEntries.length > 0 && (
                <div className="bg-white border border-border rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-primary">
                      Recent Journal Entries
                    </h2>
                    <NavLink
                      to="/journal"
                      className="text-xs font-semibold text-accent hover:underline"
                    >
                      View all
                    </NavLink>
                  </div>
                  <div className="divide-y divide-border">
                    {journalEntries.slice(0, 3).map((entry) => (
                      <div key={entry.id} className="py-3 first:pt-0 last:pb-0">
                        <span className="text-xs text-text uppercase tracking-wide">
                          {entry.date}
                        </span>
                        <h3 className="font-semibold text-primary mt-0.5">
                          {entry.title}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Orders */}
              {userOrders.length > 0 && (
                <div className="bg-white border border-border rounded-3xl p-6">
                  <h2 className="text-lg font-bold text-primary mb-4">
                    Recent Orders
                  </h2>
                  <div className="divide-y divide-border">
                    {userOrders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="py-3 first:pt-0 last:pb-0 flex items-center gap-4"
                      >
                        <img
                          src={order.recipeImage}
                          alt={order.recipeName}
                          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-primary truncate">
                            {order.recipeName}
                          </h3>
                          <p className="text-xs text-text">
                            {order.quantity} dozen
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-primary flex-shrink-0">
                          Rs. {order.total?.toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {deleteRecipeTarget && (
  <ConfirmDialog
    title="Delete Recipe"
    message={`Are you sure you want to delete "${deleteRecipeTarget.name}"? This can't be undone.`}
    onConfirm={confirmDeleteRecipe}
    onCancel={() => setDeleteRecipeTarget(null)}
  />
)}
        </section>
      </div>
    </UserLayout>
  );
};

export default Profile;
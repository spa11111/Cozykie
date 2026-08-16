import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { getRecipesByAuthor, deleteRecipe } from "../../../services/api";
import UserLayout from "../../../layout/UserLayout";
import Modal from "../../../component/Modal";
import ConfirmDialog from "../../../component/ConfirmDialog";

const YourRecipes = () => {
  const user = useSelector((state) => state.auth.user);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const data = await getRecipesByAuthor(user.id);
      setRecipes(data);
      setLoading(false);
    };

    load();
  }, [user?.id]);

const [deleteTarget, setDeleteTarget] = useState(null);

const confirmDelete = async () => {
  await deleteRecipe(deleteTarget.id);
  setRecipes((prev) => prev.filter((r) => r.id !== deleteTarget.id));
  toast.success("Recipe deleted.");
  setDeleteTarget(null);
};

  if (!user) {
    return (
      <UserLayout>
        <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-24 text-center">
          <h1
            className="text-3xl font-bold text-primary"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Log in to see your recipes
          </h1>
        </section>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1
              className="text-3xl sm:text-4xl font-bold text-primary mt-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your Recipes
            </h1>
          </div>

          <NavLink
            to="/recipes/new"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary rounded-full px-6 py-3.5 hover:bg-accent transition-colors duration-300 self-start sm:self-auto"
          >
            <FiPlus size={15} />
            New Recipe
          </NavLink>
        </div>
      </section>

      <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-16">
        {loading ? (
          <p className="text-center text-text py-16">Loading...</p>
        ) : recipes.length === 0 ? (
          <p className="text-center text-text py-16">
            You haven't shared any recipes yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-2xl overflow-hidden border border-border"
              >
                <NavLink to={`/recipes/${recipe.slug}`}>
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover"
                  />
                </NavLink>

                <div className="p-5">
                  <h3
                    className="text-lg font-semibold text-primary mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-text">{recipe.stock} in stock</p>

                  <div className="flex gap-2 mt-4">
                    <NavLink
                      to={`/recipes/${recipe.slug}/edit`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary border border-border rounded-full px-3.5 py-2 hover:border-accent hover:text-accent transition-colors"
                    >
                      <FiEdit2 size={12} />
                      Edit
                    </NavLink>

                   <button
  onClick={() => setDeleteTarget(recipe)}
  className="inline-flex items-center gap-1.5 text-xs font-medium text-text border border-border rounded-full px-3.5 py-2 hover:border-red-400 hover:text-red-500 transition-colors"
>
  <FiTrash2 size={12} />
  Delete
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      {deleteTarget && (
  <ConfirmDialog
    title="Delete Recipe"
    message={`Are you sure you want to delete "${deleteTarget.name}"? This can't be undone.`}
    onConfirm={confirmDelete}
    onCancel={() => setDeleteTarget(null)}
  />
)}
    </UserLayout>
  );
};

export default YourRecipes;
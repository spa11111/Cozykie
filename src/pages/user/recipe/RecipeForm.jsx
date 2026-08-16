import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createRecipe, updateRecipe } from "../../../services/api";
import { slugify } from "../../../component/slugify";
import DynamicListInput from "../../../component/DynamicListInput";
import UserLayout from "../../../layout/UserLayout";


const emptyRecipe = {
  name: "",
  category: "",
  badge: "",
  description: "",
  time: "",
  difficulty: "Easy",
  image: "",
  price: "",
  pricePerCookie: "",
  stock: "",
  servings: "",
  prepTime: "",
  bakeTime: "",
  ingredients: [""],
  instructions: [""],
  tips: [""],
};

const RecipeForm = ({ existingRecipe }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isEditing = Boolean(existingRecipe);

  const [formData, setFormData] = useState(
    existingRecipe
      ? {
          ...emptyRecipe,
          ...existingRecipe,
        }
      : emptyRecipe
  );
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleListChange = (field, updated) => {
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const cleanList = (arr) => arr.map((i) => i.trim()).filter(Boolean);

      const payload = {
        ...formData,
        price: Number(formData.price),
        pricePerCookie: Number(formData.pricePerCookie),
        stock: Number(formData.stock),
        rating: existingRecipe?.rating ?? 5,
        ingredients: cleanList(formData.ingredients),
        instructions: cleanList(formData.instructions),
        tips: cleanList(formData.tips),
        authorId: user.id,
      };

      if (isEditing) {
        await updateRecipe(existingRecipe.id, payload);
        toast.success("Recipe updated!");
        navigate(`/recipes/${existingRecipe.slug}`);
      } else {
        const newRecipe = { ...payload, slug: slugify(formData.name) };
        const created = await createRecipe(newRecipe);
        toast.success("Recipe published!");
        navigate(`/recipes/${created.slug}`);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return  (
  <UserLayout>
    <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-14">
      <div className="max-w-3xl mx-auto"><h1
        className="text-3xl sm:text-4xl font-bold text-primary mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {isEditing ? "Edit Recipe" : "Share a Recipe"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Recipe Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/images/your-recipe.jpg"
            className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Trending, Cozy"
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Badge
            </label>
            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Total Time
            </label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="25 min"
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Prep Time
            </label>
            <input
              type="text"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              placeholder="15 min"
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Bake Time
            </label>
            <input
              type="text"
              name="bakeTime"
              value={formData.bakeTime}
              onChange={handleChange}
              placeholder="10 min"
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Servings
          </label>
          <input
            type="text"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            placeholder="20 cookies"
            className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Price (per dozen)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Price/Cookie
            </label>
            <input
              type="number"
              name="pricePerCookie"
              value={formData.pricePerCookie}
              onChange={handleChange}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>
        </div>

        <DynamicListInput
          label="Ingredients"
          items={formData.ingredients}
          onChange={(updated) => handleListChange("ingredients", updated)}
          placeholder="Ingredient"
        />

        <DynamicListInput
          label="Instructions"
          items={formData.instructions}
          onChange={(updated) => handleListChange("instructions", updated)}
          placeholder="Step"
        />

        <DynamicListInput
          label="Tips"
          items={formData.tips}
          onChange={(updated) => handleListChange("tips", updated)}
          placeholder="Tip"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-accent text-white text-sm font-semibold rounded-full py-3.5 hover:bg-primary transition-colors disabled:opacity-60"
        >
          {submitting
            ? "Saving..."
            : isEditing
            ? "Save Changes"
            : "Publish Recipe"}
        </button>
      </form>
    </div>
    </section>
    </UserLayout>
  );
};

export default RecipeForm;
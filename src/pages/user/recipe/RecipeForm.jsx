import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe, updateRecipe, getCollections } from "../../../services/api";
import { slugify } from "../../../component/slugify";
import DynamicListInput from "../../../component/DynamicListInput";
import UserLayout from "../../../layout/UserLayout";
import ImagePicker from "../../../component/ImagePicker";

const emptyRecipe = {
  name: "",
  category: "",
  description: "",
  difficulty: "Easy",
  image: "",
  price: "",
  pricePerCookie: "",
  stock: "",
  prepTime: "",
  bakeTime: "",
  ingredients: [""],
  instructions: [""],
  tips: [""],
};

const getTotalTime = (prepTime, bakeTime) => {
  const parse = (t) => parseInt(t) || 0;
  const total = parse(prepTime) + parse(bakeTime);
  return total > 0 ? `${total} min` : "";
};

const SectionHeader = ({ eyebrow, title }) => (
  <div className="mb-5">
    <span className="text-xs uppercase tracking-[3px] font-semibold text-accent">
      {eyebrow}
    </span>
    <h2
      className="text-xl font-bold text-primary mt-1"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      {title}
    </h2>
  </div>
);

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-semibold text-primary mb-2">{label}</label>
    {children}
    {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
  </div>
);

const inputClass = (hasError) =>
  `w-full border rounded-xl px-4 py-3 text-sm bg-light-bg/40 focus:outline-none focus:ring-1 focus:ring-accent focus:bg-white transition-colors ${
    hasError ? "border-red-400" : "border-border"
  }`;

const RecipeForm = ({ existingRecipe }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isEditing = Boolean(existingRecipe);

  const [formData, setFormData] = useState(
    existingRecipe ? { ...emptyRecipe, ...existingRecipe } : emptyRecipe
  );
  const [isForSale, setIsForSale] = useState(
    existingRecipe ? Boolean(existingRecipe.price) : false
  );
  const [collections, setCollections] = useState([]);
  const [collectionsError, setCollectionsError] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await getCollections();
        setCollections(data);
      } catch (err) {
        setCollectionsError("Couldn't load categories. Refresh and try again.");
      }
    };
    fetchCollections();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleListChange = (field, updated) => {
    setFormData((prev) => ({ ...prev, [field]: updated }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (cleanedIngredients, cleanedInstructions) => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Recipe name is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.image) newErrors.image = "Please pick an image for this recipe.";
    if (!formData.category) newErrors.category = "Please select a category.";
    if (!formData.prepTime.trim()) newErrors.prepTime = "Prep time is required.";
    if (!formData.bakeTime.trim()) newErrors.bakeTime = "Bake time is required.";
    if (cleanedIngredients.length === 0)
      newErrors.ingredients = "Add at least one ingredient.";
    if (cleanedInstructions.length === 0)
      newErrors.instructions = "Add at least one instruction step.";

    if (isForSale) {
      if (!formData.price) newErrors.price = "Price is required when selling.";
      if (!formData.stock) newErrors.stock = "Stock is required when selling.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setErrors({ form: "You need to be logged in to publish a recipe." });
      return;
    }

    const cleanList = (arr) => arr.map((i) => i.trim()).filter(Boolean);
    const cleanedIngredients = cleanList(formData.ingredients);
    const cleanedInstructions = cleanList(formData.instructions);
    const cleanedTips = cleanList(formData.tips);

    const newErrors = validate(cleanedIngredients, cleanedInstructions);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const payload = {
        ...formData,
        time: getTotalTime(formData.prepTime, formData.bakeTime),
        rating: existingRecipe?.rating ?? 5,
        ingredients: cleanedIngredients,
        instructions: cleanedInstructions,
        tips: cleanedTips,
        authorId: user.id,
        isForSale,
        price: isForSale ? Number(formData.price) : null,
        pricePerCookie: isForSale ? Number(formData.pricePerCookie) : null,
        stock: isForSale ? Number(formData.stock) : null,
      };

      if (isEditing) {
        await updateRecipe(existingRecipe.id, payload);
        navigate(`/recipes/${existingRecipe.slug}`);
      } else {
        const newRecipe = { ...payload, slug: slugify(formData.name) };
        const created = await createRecipe(newRecipe);
        navigate(`/recipes/${created.slug}`);
      }
    } catch (err) {
      setErrors({ form: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const totalTimeDisplay = getTotalTime(formData.prepTime, formData.bakeTime);

  return (
    <UserLayout>
      <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-14">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[3px] font-semibold text-accent">
            Your Kitchen
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold text-primary mt-1 mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {isEditing ? "Edit Recipe" : "Share a Recipe"}
          </h1>
          <p className="text-sm text-text mb-8">
            {isEditing
              ? "Update the details below — changes go live as soon as you save."
              : "Tell the community how you bake it, step by step."}
          </p>

          {errors.form && (
            <p className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {errors.form}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* The Basics */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8">
              <SectionHeader eyebrow="Step One" title="The Basics" />
              <div className="space-y-5">
                <Field label="Recipe Name" error={errors.name}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Brown Butter Chocolate Chunk"
                    className={inputClass(errors.name)}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Category" error={errors.category}>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={inputClass(errors.category)}
                    >
                      <option value="">Select a category</option>
                      {collections.map((c) => (
                        <option key={c.id} value={c.tag}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {collectionsError && (
                      <p className="mt-1.5 text-xs text-red-600">{collectionsError}</p>
                    )}
                  </Field>

                  <Field label="Difficulty">
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className={inputClass(false)}
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </Field>
                </div>

                <Field label="About This Recipe" error={errors.description}>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="What makes this one worth baking?"
                    className={inputClass(errors.description)}
                  />
                </Field>
              </div>
            </div>

            {/* Photo */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8">
              <SectionHeader eyebrow="Step Two" title="Photo" />
              <ImagePicker
                name="image"
                value={formData.image}
                onChange={handleChange}
                label="Recipe Image"
              />
              {errors.image && (
                <p className="mt-2 text-xs text-red-600">{errors.image}</p>
              )}
            </div>

            {/* Timing */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8">
              <SectionHeader eyebrow="Step Three" title="Timing" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Prep Time" error={errors.prepTime}>
                  <input
                    type="text"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleChange}
                    placeholder="15 min"
                    className={inputClass(errors.prepTime)}
                  />
                </Field>
                <Field label="Bake Time" error={errors.bakeTime}>
                  <input
                    type="text"
                    name="bakeTime"
                    value={formData.bakeTime}
                    onChange={handleChange}
                    placeholder="10 min"
                    className={inputClass(errors.bakeTime)}
                  />
                </Field>
              </div>
              {totalTimeDisplay && (
                <p className="text-sm text-text mt-4">
                  Total time:{" "}
                  <span className="font-semibold text-primary">{totalTimeDisplay}</span>
                </p>
              )}
            </div>

            {/* Selling */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8">
              <SectionHeader eyebrow="Step Four" title="Selling" />
              <label className="flex items-center gap-3 text-sm font-medium text-primary cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isForSale}
                  onChange={(e) => setIsForSale(e.target.checked)}
                  className="h-4 w-4 accent-accent"
                />
                This recipe is for sale
              </label>

              {isForSale && (
                <div className="grid grid-cols-2 gap-4 mt-5">
                  <Field label="Price/Cookie">
                    <input
                      type="number"
                      name="pricePerCookie"
                      value={formData.pricePerCookie}
                      onChange={handleChange}
                      className={inputClass(false)}
                    />
                  </Field>
                    <Field label="Stock" error={errors.stock}>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className={inputClass(errors.stock)}
                      />
                    </Field>
                </div>
              )}
            </div>

            {/* Ingredients & Method */}
            <div className="bg-white border border-border rounded-2xl p-6 sm:p-8">
              <SectionHeader eyebrow="Step Five" title="Ingredients & Method" />
              <div className="space-y-6">
                <div>
                  <DynamicListInput
                    label="Ingredients (required)"
                    items={formData.ingredients}
                    onChange={(updated) => handleListChange("ingredients", updated)}
                    placeholder="Ingredient"
                  />
                  {errors.ingredients && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.ingredients}</p>
                  )}
                </div>

                <div>
                  <DynamicListInput
                    label="Instructions (required)"
                    items={formData.instructions}
                    onChange={(updated) => handleListChange("instructions", updated)}
                    placeholder="Step"
                  />
                  {errors.instructions && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.instructions}</p>
                  )}
                </div>

                <DynamicListInput
                  label="Tips (optional)"
                  items={formData.tips}
                  onChange={(updated) => handleListChange("tips", updated)}
                  placeholder="Tip"
                />
              </div>
            </div>

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
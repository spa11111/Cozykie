import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FiMinus, FiPlus } from "react-icons/fi";
import UserLayout from "../../layout/UserLayout";
import { getRecipeBySlug, createOrder } from "../../services/api";
import { addOrder } from "../../redux/actions/orders.actions";
import ConfirmDialog from "../../component/ConfirmDialog";

const formatNPR = (amount) => `Rs. ${amount.toLocaleString("en-IN")}`;

const Order = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.info("Please log in to place an order.");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.name) setFullName(user.name);
  }, [user]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeBySlug(slug);
        setRecipe(data);
        setError(null);
      } catch (err) {
        setError("Couldn't load this recipe right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [slug]);

  if (loading) {
    return (
      <UserLayout>
        <section className="bg-light-bg px-6 py-24 text-center">
          <p className="text-text">Loading order details...</p>
        </section>
      </UserLayout>
    );
  }

  if (error || !recipe) {
    return (
      <UserLayout>
        <section className="bg-light-bg px-6 py-24 text-center">
          <h1
            className="text-3xl font-bold text-primary mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Recipe not found
          </h1>
          <p className="text-text mb-8">
            The recipe you're trying to order doesn't exist or may have been removed.
          </p>
          <NavLink
            to="/recipes"
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold rounded-full px-6 py-3 hover:bg-accent transition-colors duration-300"
          >
            Back to Recipes
          </NavLink>
        </section>
      </UserLayout>
    );
  }

  const maxQuantity = recipe.stock;
  const total = recipe.price * quantity;

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > maxQuantity) return maxQuantity;
      return next;
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    if (!address.trim()) newErrors.address = "Delivery address is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowConfirm(true);
  };

  const confirmOrder = async () => {
    setShowConfirm(false);
    setSubmitting(true);

    try {
      const newOrder = {
        userId: user.id,
        recipeSlug: recipe.slug,
        recipeName: recipe.name,
        recipeImage: recipe.image,
        quantity,
        pricePerUnit: recipe.price,
        total,
        fullName,
        phone,
        address,
        notes,
        createdAt: Date.now(),
      };

      const created = await createOrder(newOrder);
      dispatch(addOrder(created));

      toast.success(`Order placed for ${quantity} dozen ${recipe.name}!`);
      navigate(`/`);
    } catch (err) {
      toast.error("Something went wrong placing your order. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <UserLayout>
      <section className="bg-light-bg px-6 py-16 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="max-w-6xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl font-bold text-primary mb-8 text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Order {recipe.name}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Recipe summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-border rounded-2xl overflow-hidden sticky top-24">
                <div className="h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <h3
                    className="text-lg font-bold text-primary mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-text mb-4">{recipe.description}</p>

                  <div className="flex items-center justify-between text-sm text-text pt-4 border-t border-border">
                    <span>Price per piece</span>
                    <span className="font-semibold text-primary">{formatNPR(recipe.price)}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-text mt-2">
                    <span>Quantity</span>
                    <span className="font-semibold text-primary">{quantity}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                    <span className="font-semibold text-primary">Total</span>
                    <span className="text-xl font-bold text-primary">{formatNPR(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-6 sm:p-8 space-y-6">
                {/* Quantity stepper */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Quantity (dozens)
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-primary hover:border-accent hover:text-accent transition-colors"
                    >
                      <FiMinus size={14} />
                    </button>

                    <span className="text-lg font-semibold text-primary w-8 text-center">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-primary hover:border-accent hover:text-accent transition-colors"
                    >
                      <FiPlus size={14} />
                    </button>

                    <span className="text-xs text-text ml-2">
                      {maxQuantity} available
                    </span>
                  </div>
                </div>

                {/* Full name */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setErrors((prev) => ({ ...prev, fullName: "" }));
                    }}
                    placeholder="Your full name"
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-accent transition-colors ${
                      errors.fullName ? "border-red-400" : "border-border"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    placeholder="98XXXXXXXX"
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-accent transition-colors ${
                      errors.phone ? "border-red-400" : "border-border"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setErrors((prev) => ({ ...prev, address: "" }));
                    }}
                    placeholder="Street, city, landmark"
                    rows={3}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none ${
                      errors.address ? "border-red-400" : "border-border"
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.address}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests..."
                    rows={2}
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent text-white text-sm font-semibold rounded-full py-3.5 hover:bg-primary transition-colors duration-300 disabled:opacity-60"
                >
                  {submitting ? "Placing Order..." : `Place Order — ${formatNPR(total)}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {showConfirm && (
        <ConfirmDialog
          title="Confirm Your Order"
          message={`Place an order for ${quantity} dozen ${recipe.name} (${formatNPR(total)} total), delivered to "${address}"?`}
          confirmLabel="Place Order"
          onConfirm={confirmOrder}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </UserLayout>
  );
};

export default Order;
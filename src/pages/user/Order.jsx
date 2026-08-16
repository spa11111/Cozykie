import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import UserLayout from "../../layout/UserLayout";
import { getRecipeBySlug } from "../../services/api";
import { useDispatch } from "react-redux";
import { createOrder } from "../../services/api";
import { addOrder } from "../../redux/actions/orders.actions";


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
  const [submitting, setSubmitting] = useState(false);

  // Guard: redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.info("Please log in to place an order.");
      navigate("/login");
    }
  }, [user, navigate]);

  // Prefill name from logged-in user
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

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!fullName.trim() || !phone.trim() || !address.trim()) {
    toast.error("Please fill in your name, phone, and delivery address.");
    return;
  }

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
      <div className="bg-light-bg">
<div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-10 lg:py-14"> 

          <h1
            className="text-3xl sm:text-4xl font-bold text-primary mb-8"
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
                    <span>Price per dozen</span>
                    <span className="font-semibold text-primary">{formatNPR(recipe.price)}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-text mt-2">
                    <span>Quantity</span>
                    <span className="font-semibold text-primary">{quantity} dozen</span>
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
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, city, landmark"
                    rows={3}
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
                  />
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
      </div>
    </UserLayout>
  );
};

export default Order;
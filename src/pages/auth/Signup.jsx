import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import AuthLayout from "../../layout/AuthLayout";

const heading = {
  title: "Start your baking story.",
  desc: "Save recipes, track your bakes, and join the community.",
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle signup
  };

  return (
    <AuthLayout heading={heading}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-primary/80 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <FiUser
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text"
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane Baker"
              className="w-full border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-primary bg-white focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-primary/80 mb-1.5">
            Email
          </label>
          <div className="relative">
            <FiMail
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-primary bg-white focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-primary/80 mb-1.5">
            Password
          </label>
          <div className="relative">
            <FiLock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className="w-full border border-border rounded-xl pl-11 pr-11 py-3 text-sm text-primary bg-white focus:outline-none focus:ring-1 focus:ring-accent"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text hover:text-primary transition-colors"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-primary/80 mb-1.5">
            Confirm Password
          </label>
          <div className="relative">
            <FiLock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full border border-border rounded-xl pl-11 pr-11 py-3 text-sm text-primary bg-white focus:outline-none focus:ring-1 focus:ring-accent"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text hover:text-primary transition-colors"
            >
              {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-start gap-2 text-sm text-text cursor-pointer select-none pt-1">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-accent text-accent"
            required
          />
          <span>
            I agree to the{" "}
            <NavLink to="/terms" className="font-medium text-primary hover:text-accent transition-colors">
              Terms of Service
            </NavLink>{" "}
            and{" "}
            <NavLink to="/privacy" className="font-medium text-primary hover:text-accent transition-colors">
              Privacy Policy
            </NavLink>
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full text-sm font-semibold text-white bg-primary rounded-full px-6 py-3.5 hover:bg-accent transition-colors duration-300 mt-2"
        >
          Create Account
        </button>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-text mt-4">
        Already have an account?{" "}
        <NavLink
          to="/login"
          className="font-semibold text-primary hover:text-accent transition-colors"
        >
          Log in
        </NavLink>
      </p>
    </AuthLayout>
  );
};

export default Signup;

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

import AuthLayout from "../../layout/AuthLayout";

const heading = {
  title: "Welcome back, baker.",
  desc: "Pick up where you left off.",
};

// Local user for testing
const localUser = {
  id: 1,
  name: "Sparsha",
  email: "sparsha@gmail.com",
  username: "sparsha",
  password: "12345678",
};

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Get registered users
    const users = JSON.parse(
      localStorage.getItem("cozykieUsers") || "[]"
    );

    const identifier = formData.identifier.trim().toLowerCase();

    // Find matching email/username and password
    const user = users.find(
      (user) =>
        user.email.toLowerCase() === identifier &&
        user.password === formData.password
    );

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    // Store currently logged-in user
    localStorage.setItem(
      "cozykieUser",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    );

    // Tell Header that login state changed
    window.dispatchEvent(
      new Event("cozykieAuthChange")
    );

    // Go to homepage
    navigate("/");
  };



  return (
    <AuthLayout heading={heading}>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* Email or Username */}
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
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Enter your email or username"
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
              placeholder="••••••••"
              className="w-full border border-border rounded-xl pl-11 pr-11 py-3 text-sm text-primary bg-white focus:outline-none focus:ring-1 focus:ring-accent"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text hover:text-primary transition-colors"
            >
              {showPassword ? (
                <FiEyeOff size={16} />
              ) : (
                <FiEye size={16} />
              )}
            </button>

          </div>

        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between">

          <label className="flex items-center gap-2 text-sm text-text cursor-pointer select-none">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(e.target.checked)
              }
              className="w-4 h-4 rounded border-accent text-accent"
            />

            Remember me

          </label>

          <NavLink
            to="/forgot-password"
            className="text-sm font-medium text-primary hover:text-accent transition-colors"
          >
            Forgot password?
          </NavLink>

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full text-sm font-semibold text-white bg-primary rounded-full px-6 py-3.5 hover:bg-accent transition-colors duration-300 mt-2"
        >
          Log In
        </button>

      </form>

      {/* Signup link */}
      <p className="text-center text-sm text-text mt-4">

        New to Cozykie?{" "}

        <NavLink
          to="/create"
          className="font-semibold text-primary hover:text-accent transition-colors"
        >
          Create an account
        </NavLink>

      </p>

    </AuthLayout>
  );
};

export default Login;

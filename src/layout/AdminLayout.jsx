import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiGrid, FiUsers, FiFolder, FiShoppingBag, FiBook, FiUser, FiLogOut,
} from "react-icons/fi";
import ConfirmDialog from "../component/ConfirmDialog";
import { logout } from "../redux/actions/auth.actions";
import { useState } from "react";
import logo from "../assets/images/logo.png";


const navItems = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/admin/users", label: "Users", icon: FiUsers },
  { to: "/admin/collections", label: "Collections", icon: FiFolder },
  { to: "/admin/orders", label: "Orders", icon: FiShoppingBag },
  { to: "/admin/recipes", label: "Recipes", icon: FiBook },
  { to: "/admin/profile", label: "Profile", icon: FiUser },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <aside className="w-64 bg-white border-r border-border flex flex-col p-6">
      <NavLink to="/">
            <img
              src={logo}
              alt="Cozykie"
              className="w-16 object-contain sm:w-20 mb-3"
            />
          </NavLink>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-text hover:bg-primary/5 hover:text-primary"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border pt-4 mt-4">
          <p className="text-sm font-semibold text-primary">{user?.name}</p>
          <p className="text-xs text-text mb-3">{user?.email}</p>
          <button
  onClick={() => setShowLogoutConfirm(true)}
  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
>
  <FiLogOut size={14} />
  Log out
</button> 
{showLogoutConfirm && (
  <ConfirmDialog
    title="Log Out"
    message="Are you sure you want to log out?"
    confirmLabel="Log Out"
    onConfirm={() => {
      setShowLogoutConfirm(false);
      handleLogout();
    }}
    onCancel={() => setShowLogoutConfirm(false)}
  />
)}    </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>

    
  );
};

export default AdminLayout;
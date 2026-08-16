import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../redux/actions/auth.actions";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const orderStatusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};
  return (
    <div className="max-w-md">
      <h1
        className="text-3xl font-bold text-primary mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Profile
      </h1>

      <div className="bg-white border border-border rounded-2xl p-6">
        <p className="text-lg font-semibold text-primary">{user?.name}</p>
        <p className="text-sm text-text mb-6">{user?.email}</p>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-red-500 rounded-full px-5 py-3 hover:bg-red-600 transition-colors"
        >
          <FiLogOut size={15} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
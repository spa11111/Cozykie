import { Route, Routes } from "react-router-dom";

import Home from "./pages/user/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import PageNotFound from "./pages/PageNotFound";
import RecipeScaler from "./pages/user/tools/RecipeScaler";
import MeasurementConverter from "./pages/user/tools/MeasurementConverter";
import PantrySubstitution from "./pages/user/tools/PantrySubstitution";
import Collections from "./pages/user/Collections";
import Recipes from "./pages/user/Recipes";
import RecipeDetail from "./pages/user/RecipeDetail";
import Order from "./pages/user/Order";
import Favourites from "./pages/user/Favourites";
import Journal from "./pages/user/Journal";
import Profile from "./pages/user/Profile";
import CreateRecipe from "./pages/user/recipe/CreateRecipe";
import EditRecipe from "./pages/user/recipe/EditRecipe";
import YourRecipes from "./pages/user/recipe/YourRecipes";
import AdminLayout from "./layout/AdminLayout";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCollections from "./pages/admin/AdminCollections";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminRecipes from "./pages/admin/AdminRecipes";
import AdminProfile from "./pages/admin/AdminProfile";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Signup />} />

      <Route path="/tools/scaler" element={<RecipeScaler />} />
      <Route path="/tools/converter" element={<MeasurementConverter />} />
      <Route path="/tools/substitution" element={<PantrySubstitution />} />

      <Route path="/collections" element={<Collections />} />

      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/:slug" element={<RecipeDetail />} />

            <Route path="/order/:slug" element={<Order />} />

            <Route path="/favourite" element={<Favourites />} />
             <Route path="/journal" element={<Journal />} />
             <Route path="/profile" element={<Profile />} />

             <Route path="/recipes/new" element={<CreateRecipe />} />
<Route path="/recipes/:slug/edit" element={<EditRecipe />} />
<Route path="/your-recipes" element={<YourRecipes />} />


<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="users" element={<AdminUsers />} />
  <Route path="collections" element={<AdminCollections />} />
  <Route path="orders" element={<AdminOrders />} />
  <Route path="recipes" element={<AdminRecipes />} />
  <Route path="profile" element={<AdminProfile />} />
</Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MyRoutes;
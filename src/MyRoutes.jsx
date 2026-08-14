import { Route, Routes } from "react-router-dom";

import Home from "./pages/user/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import PageNotFound from "./pages/PageNotFound";
import About from "./pages/user/About";
import RecipeScaler from "./pages/user/tools/RecipeScaler";
import MeasurementConverter from "./pages/user/tools/MeasurementConverter";
import PantrySubstitution from "./pages/user/tools/PantrySubstitution";
import Collections from "./pages/user/Collections";
import Recipes from "./pages/user/Recipes";
import RecipeDetail from "./component/recipes/RecipeDetail";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Signup />} />

      <Route path="/tools/scaler" element={<RecipeScaler />} />
      <Route path="/tools/converter" element={<MeasurementConverter />} />
      <Route path="/tools/substitution" element={<PantrySubstitution />} />

      <Route path="/collections" element={<Collections />} />

      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/:slug" element={<RecipeDetail />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MyRoutes;
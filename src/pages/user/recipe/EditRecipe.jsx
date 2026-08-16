import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getRecipeBySlug } from "../../../services/api";
import RecipeForm from "./RecipeForm";

const EditRecipe = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getRecipeBySlug(slug);

      if (!data) {
        toast.error("Recipe not found.");
        navigate("/profile");
        return;
      }

      if (String(data.authorId) !== String(user?.id)) {
        toast.error("You can only edit your own recipes.");
        navigate("/profile");
        return;
      }

      setRecipe(data);
      setLoading(false);
    };

    load();
  }, [slug, user?.id]);

  if (loading) {
    return <div className="text-center py-24 text-text">Loading...</div>;
  }

  return <RecipeForm existingRecipe={recipe} />;
};

export default EditRecipe;
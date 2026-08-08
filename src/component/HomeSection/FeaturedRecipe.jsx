import { NavLink } from "react-router-dom";
import { FiStar, FiArrowRight } from "react-icons/fi";
import redVelvet from "../../assets/images/red-velvet-cookie.png";
import whiteChocMacadamia from "../../assets/images/white-choc-macadamia-cookie.png";
import snickerdoodle from "../../assets/images/snickerdoodle-cookie.png";
import tripleChocolate from "../../assets/images/triple-chocolate-cookie.png";
import SectionHeads from "../SectionHeads";

const heading = {
  span: "TODAY'S RECIPE",
  title: "A recipe worth sharing",
  desc: "Soft, chewy, and packed with flavour—this recipe deserves a place in your recipe book.",
};

const recipes = [
  {
    slug: "red-velvet",
    name: "Red Velvet",
    desc: "With creamy white chocolate chips.",
    rating: 4.9,
    time: "26 min",
    difficulty: "Medium",
    image: redVelvet,
    badgeColor: "bg-accent text-border",
  },
  {
    slug: "white-choc-macadamia",
    name: "White Choc Macadamia",
    desc: "Buttery with a satisfying crunch.",
    rating: 4.8,
    time: "23 min",
    difficulty: "Easy",
    image: whiteChocMacadamia,
    badgeColor: "bg-accent text-border",
  },
    {
    slug: "snickerdoodle",
    name: "Snickerdoodle",
    desc: "Rolled in cinnamon sugar.",
    rating: 4.8,
    time: "20 min",
    difficulty: "Easy",
    image: snickerdoodle,
    badgeColor: "bg-accent text-border",
  },
  {
    slug: "triple-chocolate",
    name: "Triple Chocolate",
    desc: "For the serious chocolate lover.",
    rating: 4.9,
    time: "27 min",
    difficulty: "Medium",
    image: tripleChocolate,
    badgeColor: "bg-accent text-border",
  },
];

const FeaturedRecipe = () => {
  return (
    <section className="bg-dark-bg px-6 lg:px-10 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <SectionHeads heading={heading} />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {recipes.map((recipe) => (
        <div
          key={recipe.slug}
          className="group flex flex-col bg-light-bg rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
        >
          {/* Image */}
          <NavLink
            to={`/recipes/${recipe.slug}`}
            className="block h-56 overflow-hidden"
          >
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </NavLink>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <span
          className={`inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full mb-3 ${recipe.badgeColor}`}
        >
          New
        </span>

        <h3
          className="text-xl font-bold text-primary mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {recipe.name}
        </h3>

        <p className="text-sm text-text mb-3 leading-relaxed">
          {recipe.desc}
        </p>

        <div className="flex items-center gap-1.5 text-sm text-text mb-4">
          <FiStar
            className="fill-tag text-tag"
            size={13}
          />
          <span className="font-semibold text-text">
            {recipe.rating}
          </span>
          <span>•</span>
          <span>{recipe.time}</span>
          <span>•</span>
          <span>{recipe.difficulty}</span>
        </div>

        <NavLink
          to={`/recipes/${recipe.slug}`}
          className="mt-auto flex items-center justify-end gap-2 text-sm font-semibold text-accent hover:text-primary transition-colors duration-300"
        >
          Try it out
          <FiArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </NavLink>
      </div>
    </div>
  ))}
</div>    

      </div>
    </section>
  );
};

export default FeaturedRecipe;
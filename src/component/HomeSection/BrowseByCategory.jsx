import { Link, NavLink } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import chocolateCookie from "../../assets/images/chocolate-cookie.jpg";
import rainydayCookie from "../../assets/images/rainy-day-cookie.jpg";
import nuttyCookie from "../../assets/images/nuttyy-cookie.jpg";
import holidayCookie from "../../assets/images/holiday-cookie.jpg";
import SectionHeads from "../SectionHeads";

const heading = {
  span: "Featured Collections",
  title: "Discover your next bake",
  desc: "Browse curated collections filled with comforting homemade favourites.",
};


const collections = [
  {
    slug: "rainy-day",
    name: "Rainy Day Cookies",
    badge: "Cozy Pick",
    rating: 4.8,
    time: "20 min",
    image: rainydayCookie,
  },
  {
    slug: "holiday-favorites",
    name: "Holiday Favorites",
    badge: "Seasonal",
    rating: 4.9,
    time: "35 min",
    image: holidayCookie,
  },
  {
    slug: "chocolate-lovers",
    name: "Chocolate Lovers",
    badge: "Community Pick",
    rating: 4.7,
    time: "25 min",
    image: chocolateCookie,
  },
  {
    slug: "nutty-flavors",
    name: "Nutty Flavors",
    badge: "Trending",
    rating: 4.6,
    time: "30 min",
    image: nuttyCookie,
  },
];

const BrowseByCategory = () => {
  return (
    <section className="bg-light-bg px-6 lg:px-10 py-20">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <SectionHeads heading={heading} />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((item) => (
            <Link
              key={item.slug}
              to={`/collections/${item.slug}`}
              className="group relative h-[420px] rounded-3xl overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <span className="absolute top-4 left-4 bg-tag-bg text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                {item.badge}
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 text-white text-sm mb-2">
                  <FiStar className="fill-yellow-500 text-yellow-500" size={14} />
                  <span className="font-semibold">{item.rating}</span>
                  <span className="text-white/60">•</span>
                  <span>{item.time}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-2 leading-snug">
                  {item.name}
                </h3>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-tag-bg group-hover:text-tag transition">
                  See recipe
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BrowseByCategory;
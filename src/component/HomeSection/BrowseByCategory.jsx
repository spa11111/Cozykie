import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import SectionHeads from "../SectionHeads";
import { getCollections } from "../../services/api";

const heading = {
  span: "Featured Collections",
  title: "Discover your next bake",
  desc: "Browse curated collections filled with comforting homemade favourites.",
};

const BrowseByCategory = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const data = await getCollections();
        setCollections(data.slice(0, 4));
      } catch (err) {
        setCollections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return (
      <section className="bg-light-bg px-6 py-16 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <SectionHeads heading={heading} />
        <p className="text-center text-text py-16">Loading collections...</p>
      </section>
    );
  }

  return (
    <section className="bg-light-bg px-6 py-16 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <SectionHeads heading={heading} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((item) => (
          <Link
            key={item.slug}
            to={`/recipes?filter=${encodeURIComponent(item.tag)}`}
            className="group relative h-[420px] overflow-hidden rounded-3xl"
          >
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            <span className="absolute left-4 top-4 rounded-full bg-tag-bg px-3 py-1.5 text-xs font-semibold text-primary">
              {item.tag}
            </span>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="mb-2 font-serif text-xl font-bold leading-snug text-white">
                {item.name}
              </h3>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-tag-bg transition group-hover:text-tag">
                See recipe
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BrowseByCategory; 
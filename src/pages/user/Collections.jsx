import { useState, useMemo, useEffect } from "react";
import UserLayout from "../../layout/UserLayout";
import CollectionFilters from "../../component/collections/CollectionFilter";
import CollectionCard from "../../component/collections/CollectionCard";
import Heros from "../../component/Heros";
import { getCollections } from "../../services/api";
import collectionsHero from "../../assets/images/collection-hero.jpg";

export const FILTERS = [
  "All",
  "Cozy",
  "Seasonal",
  "Chocolate",
  "Quick & Easy",
  "Community",
  "Trending",
];

const heading = {
  span: "Collections",
  title: "Find your next favourite bake.",
  desc: "Browse curated collections filled with comforting homemade favourites, seasonal treats, and community-loved recipes.",
};

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const data = await getCollections();
        setCollections(data);
        setError(null);
      } catch (err) {
        setError("Couldn't load collections right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const filteredCollections = useMemo(() => {
    if (activeFilter === "All") return collections;
    return collections.filter((c) => c.tag === activeFilter);
  }, [collections, activeFilter]);

  return (
    <UserLayout>
      {/* Hero */}
      <Heros
        heading={heading}
        image={collectionsHero}
        alt="A spread of freshly baked cookies"
        ctaLabel={null}
      />

      {/* Filters */}
      <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-12">
        <CollectionFilters
          filters={FILTERS}
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />
      </section>

      {/* Collection Grid */}
      <section className="bg-light-bg px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-16">
        {loading ? (
          <p className="text-center text-text py-16">Loading collections...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-16">{error}</p>
        ) : filteredCollections.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCollections.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text py-16">
            No collections found for this filter yet.
          </p>
        )}
      </section>
    </UserLayout>
  );
};

export default Collections;
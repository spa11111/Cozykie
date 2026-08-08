import { FiStar } from "react-icons/fi";
import SectionHeads from "../SectionHeads";

const heading = {
  span: "OUR COMMUNITY",
  title: "Baked, shared, and loved",
  desc: "Read experiences, tips, and little baking moments shared by home bakers across Nepal.",
};

const reviews = [
  {
    id: "1",
    name: "Sita Maharjan",
    location: "Kathmandu",
    text: "Tried chilling the dough overnight before baking. The cookies turned out much softer and had a richer flavour.",
    rating: 5,
  },
  {
    id: "2",
    name: "Nabin Shrestha",
    location: "Bhaktapur",
    text: "The measurement converter was really helpful. My original recipe used cups, but I only bake using grams.",
    rating: 5,
  },
  {
    id: "3",
    name: "Aashmita Tamang",
    location: "Pokhara",
    text: "I started saving notes after every bake. Looking back at my journal makes improving each recipe so much easier.",
    rating: 4,
  },
];

const CommunitySection = () => {
  return (
    <section className="bg-light-bg px-6 lg:px-10 py-20">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <SectionHeads heading={heading} />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              style={{
                backgroundColor: "white",
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent, transparent 34px, #EDE2D3 35px)",
                backgroundPosition: "0 86px",
              }}
            >
              <div className="px-6 py-6">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-dashed border-border pb-3 mb-5">
                  <div>
                    <h3 className="font-semibold text-primary">
                      {review.name}
                    </h3>

                    <p className="text-xs text-text">
                      {review.location}
                    </p>
                  </div>

                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? "fill-tag text-tag"
                            : "text-border"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Review */}
                <p className="text-primary leading-8 text-base">
                  {review.text}
                </p>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-dashed border-border">
                  <span className="text-xs uppercase tracking-[2px] text-accent font-semibold">
                    Community Story
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CommunitySection;
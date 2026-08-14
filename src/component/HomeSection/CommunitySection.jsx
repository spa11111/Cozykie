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
    <section className="bg-light-bg px-6 py-16 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <SectionHeads heading={heading} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-lg"
            style={{
              backgroundColor: "white",
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 34px, #EDE2D3 35px)",
              backgroundPosition: "0 86px",
            }}
          >
            <div className="px-6 py-6">

              <div className="mb-5 flex items-center justify-between border-b border-dashed border-border pb-3">

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

              <p className="text-base leading-8 text-primary">
                {review.text}
              </p>

              <div className="mt-6 border-t border-dashed border-border pt-4">
                <span className="text-xs font-semibold uppercase tracking-[2px] text-accent">
                  Community Story
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunitySection;
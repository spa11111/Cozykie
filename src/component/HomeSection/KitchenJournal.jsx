import { Link } from "react-router-dom";
import kitchenJournalHero from "../../assets/images/kitchen-journal-hero.jpg";
import SectionHeads from "../SectionHeads";

const heading = {
  span: "Personal Journal",
  title: "Every recipe tells a story",
  desc: "Save baking notes, memorable moments, and the little tweaks that make each recipe your own.",
};

const notes = [
  {
    quote: '"Chilled the dough 24h — way chewier. Added flaky salt on top!"',
    recipe: "Browned Butter Chunk",
    rating: 5,
    date: "24 Jan 2026",
    emphasis: true,
  },
  {
    quote: '"Swapped raisins for dried cranberries. Kids approved."',
    recipe: "Oatmeal Cookies",
    rating: 5,
    date: "12 Jan 2026",
    emphasis: false,
  },
];

const Star = ({ filled }) => (
  <span className={filled ? "text-tag" : "text-tag/40"}>★</span>
);

const KitchenJournal = () => {
  return (
    <section className="bg-dark-bg px-6 lg:px-10 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">

        {/* Left */}
        <div className="flex flex-col justify-center">

          {/* Smaller spacing than other sections */}
          <div className="mb-1">
            <SectionHeads heading={heading} />
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-5">
            {notes.map((note, i) => (
              <div
                key={i}
                className={`relative rounded-[2rem] px-8 py-7 mb-5 shadow-md transition hover:-translate-y-1 ${
                  note.emphasis ? "bg-border" : "bg-light-bg"
                }`}
              >
                {/* Tape */}
                <div className="absolute -top-2 left-8 w-20 h-5 bg-hover/70 rounded rotate-[-6deg]" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[3px] font-bold text-primary">
                      {note.recipe}
                    </p>

                    <p className="text-xs text-text mt-1">
                      {note.date}
                    </p>
                  </div>

                  <div className="text-lg">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} filled={idx < note.rating} />
                    ))}
                  </div>
                </div>

                <p className="text-xl leading-relaxed text-primary mt-3 mb-2">
                  {note.quote}
                </p>
              </div>
            ))}
          </div>

          {/* Link */}
          <div className="flex justify-end mt-6">
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-hover transition"
            >
              Start your journal
              <span className="transition-transform hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Right */}
          <div className="h-[600px] rounded-[2.5rem] overflow-hidden shadow-xl">
            <img
              src={kitchenJournalHero}
              alt="Kitchen journal"
              className="w-full h-full object-cover"
            />
          </div>

      </div>
    </section>
  );
};

export default KitchenJournal;
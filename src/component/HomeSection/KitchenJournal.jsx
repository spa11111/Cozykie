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
  <span className={filled ? "text-tag" : "text-tag/40"}>
    ★
  </span>
);

const KitchenJournal = () => {
  return (
    <section className="bg-dark-bg px-6 py-16 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

        {/* Left */}
        <div className="flex flex-col justify-center">

          <div className="mb-1">
            <SectionHeads heading={heading} />
          </div>

          <div className="flex flex-col gap-5">
            {notes.map((note, i) => (
              <div
                key={i}
                className={`relative mb-5 rounded-[2rem] px-8 py-7 shadow-md transition hover:-translate-y-1 ${
                  note.emphasis
                    ? "bg-border"
                    : "bg-light-bg"
                }`}
              >
                <div className="absolute -top-2 left-8 h-5 w-20 rotate-[-6deg] rounded bg-hover/70" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[3px] text-primary">
                      {note.recipe}
                    </p>

                    <p className="mt-1 text-xs text-text">
                      {note.date}
                    </p>
                  </div>

                  <div className="text-lg">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        filled={idx < note.rating}
                      />
                    ))}
                  </div>
                </div>

                <p className="mb-2 mt-3 text-xl leading-relaxed text-primary">
                  {note.quote}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-hover"
            >
              Start your journal
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="h-[600px] overflow-hidden rounded-[2.5rem] shadow-xl">
          <img
            src={kitchenJournalHero}
            alt="Kitchen journal"
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default KitchenJournal;
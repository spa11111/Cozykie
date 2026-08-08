import { FiThermometer, FiClock, FiDroplet } from "react-icons/fi";

const tips = [
  { icon: FiThermometer, text: "Always preheat your oven fully — 10 minutes minimum for even baking." },
  { icon: FiClock, text: "Chill your dough at least 30 minutes to stop cookies from spreading too thin." },
  { icon: FiDroplet, text: "Room-temperature butter creams better and gives a softer, chewier bite." },
];

const BakingTips = () => {
  return (
    <section className="bg-[#F4ECE4] px-6 lg:px-10 py-16">
      <div className="max-w-7xl mx-auto">

        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#4E2D20] mb-10 text-center">
          Cozy Tips
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
            <div key={i} className="bg-white border border-[#E8D8C8] rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#F4ECE4] flex items-center justify-center mb-4">
                <tip.icon className="text-[#9D6335]" size={20} />
              </div>
              <p className="text-sm text-[#6B4A3A] leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BakingTips;
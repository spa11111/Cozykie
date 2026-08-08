const Email = () => {
  return (
    <section className="bg-[#9D6335] px-6 lg:px-10 py-16">
      <div className="max-w-2xl mx-auto text-center">

        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
          Never miss a warm batch.
        </h2>
        <p className="text-[#F4ECE4] mb-8">
          Get new recipes, seasonal collections, and baking tips delivered weekly.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address..."
            className="flex-1 bg-white border border-transparent rounded-full px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#4E2D20] transition"
          />
          <button
            type="submit"
            className="bg-[#4E2D20] hover:bg-[#3D2318] text-white font-semibold rounded-full px-7 py-3 transition"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
};

export default Email;
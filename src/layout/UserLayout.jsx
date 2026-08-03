import Header from "../component/Header";
import Footer from "../component/Footer";

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />

      <main className="min-h-screen  bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default UserLayout;
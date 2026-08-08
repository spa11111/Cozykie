import Header from "../component/Header";
import Footer from "../component/Footer";

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />

      <main className="min-h-screen  bg-[#F9F8F6]">
        <div>
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default UserLayout;
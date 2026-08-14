import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop";
import MyRoutes from "./MyRoutes";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <MyRoutes />
    </>
  );
};

export default App;
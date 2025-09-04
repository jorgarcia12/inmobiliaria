import { Outlet } from "react-router-dom";
import { Footer } from "../../components/UI/Footer/Footer";
import { NavBar } from "../../components/UI/NavBar/NavBar";

export const PublicLayout = () => {
  return (
    <div className="appContainer">
      <NavBar />
      <main className="mainContent">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

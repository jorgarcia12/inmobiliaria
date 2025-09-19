import { Outlet } from "react-router-dom";
import { NavBarAdmin } from "../../components/UI/Admin/NavBarAdmin/NavBarAdmin";

export const AdminLayout = () => {
  return (
    <div className="appContainer">
      <NavBarAdmin />
      <main className="mainContent">
        <Outlet />
      </main>
    </div>
  );
};

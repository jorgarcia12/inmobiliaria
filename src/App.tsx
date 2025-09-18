import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home/Home";

import "./App.css";
import { Properties } from "./views/Property/Properties";
import { AdminLayout } from "./views/AdminLayout/AdminLayout";
import { PublicLayout } from "./views/PublicLayout/PublicLayout";
import { AdminView } from "./views/AdminView/AdminView";
import { AddProperty } from "./components/UI/Admin/AddProperty/AddProperty";
import { EditProperty } from "./components/UI/Admin/EditProperty/EditProperty";
import { LoginView } from "./views/AuthView/LoginView/LoginView";
import { CreateUserForm } from "./components/UI/Admin/Users/CreateUserForm/CreateUserForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Layout para las rutas publicas */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/propiedades" element={<Properties />} />
          </Route>

          <Route path="/auth/login" element={<LoginView />} />

          {/* Layout para las rutas de admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminView />} />
            <Route path="add-property" element={<AddProperty />} />
            <Route path="editar/:id" element={<EditProperty />} />
            <Route path="users/add-user" element={<CreateUserForm />} />
            {/* <Route path="usuarios" element={<UsuariosAdmin />} />
            <Route path="propiedades" element={<PropiedadesAdmin />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

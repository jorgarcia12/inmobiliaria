import { Route } from "react-router-dom";
import { AdminLayout } from "../views/AdminLayout/AdminLayout";
import { AdminView } from "../views/AdminView/AdminView";
import { AddProperty } from "../components/UI/Admin/AddProperty/AddProperty";
import { EditProperty } from "../components/UI/Admin/EditProperty/EditProperty";
import { CreateUserForm } from "../components/UI/Admin/Users/CreateUserForm/CreateUserForm";
import { UsersView } from "../views/UsersView/UsersView";
import { PrivateRoute } from "./PrivateRoute";
import { UnderConstructionView } from "../views/UnderConstructionView/UnderConstructionView";

export const ProtectedRoutes = (
  <Route
    path="/admin"
    element={
      <PrivateRoute requiredRole="ADMIN">
        <AdminLayout />
      </PrivateRoute>
    }
  >
    <Route index element={<AdminView />} />
    <Route path="add-property" element={<AddProperty />} />
    <Route path="editar/:id" element={<EditProperty />} />
    <Route path="users/add-user" element={<CreateUserForm />} />
    <Route path="users" element={<UsersView />} />
    <Route path="construccion" element={<UnderConstructionView/>} />
  </Route>
);

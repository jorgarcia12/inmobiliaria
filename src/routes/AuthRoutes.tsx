import { Route } from "react-router-dom";
import { LoginView } from "../views/AuthView/LoginView/LoginView";

export const AuthRoutes = <Route path="/auth/login" element={<LoginView />} />;

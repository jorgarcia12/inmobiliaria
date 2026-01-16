import { Route } from "react-router-dom";
import { PublicLayout } from "../views/PublicLayout/PublicLayout";
import { Home } from "../views/Home/Home";
import { PropertyList } from "../views/Property/PropertyList";
import { UnderConstructionView } from "../views/UnderConstructionView/UnderConstructionView";
import { Property } from "../views/Property/Property";

export const PublicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/propiedades" element={<PropertyList />} />
    <Route path="/propiedades/:slug" element={<Property />} />

    <Route path="/construccion" element={<UnderConstructionView />} />
  </Route>
);

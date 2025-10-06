import { Route } from "react-router-dom";
import { PublicLayout } from "../views/PublicLayout/PublicLayout";
import { Home } from "../views/Home/Home";
import { Properties } from "../views/Property/Properties";
import { UnderConstructionView } from "../views/UnderConstructionView/UnderConstructionView";

export const PublicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/propiedades" element={<Properties />} />
    <Route path="/constuccion" element={<UnderConstructionView/>} />
  </Route>
);

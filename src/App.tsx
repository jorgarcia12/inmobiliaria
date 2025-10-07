import { BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PublicRoutes } from "./routes/PublicRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {PublicRoutes}
          {AuthRoutes}
          {ProtectedRoutes}
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        pauseOnHover
        draggable
        theme="colored"
      />
      <SpeedInsights />
    </>
  );
}

export default App;

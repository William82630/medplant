import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { PlantsProvider } from "./context/PlantsContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PlantsProvider>
        <App />
      </PlantsProvider>
    </BrowserRouter>
  </StrictMode>
);

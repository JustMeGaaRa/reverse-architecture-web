import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "reactflow/dist/style.css";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

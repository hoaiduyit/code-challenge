import React from "react";
import ReactDOM from "react-dom/client";

import Root from "./root";

import "@app/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);

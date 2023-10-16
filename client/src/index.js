import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Routes>
        <Route path="/*" element={<App />} />
      </Routes> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

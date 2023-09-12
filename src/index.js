import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/Auth";
import { MovieProvider } from "./context/Movies";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <MovieProvider>
        <App />
        <ToastContainer />
      </MovieProvider>
    </AuthProvider>
  </BrowserRouter>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App /> {/* wrapped the app tag in BrowerRouter so that we get this support in the whole webpage*/}
    </ShopContextProvider>
   
  </BrowserRouter>
);

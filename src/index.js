import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import ShopContextProvider from "./Context/ShopContext";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Common layout with navbar
    children: [
      {
        path: "",
        element: <Shop />,
      },
      {
        path: "men",
        element: <ShopCategory category="men" banner={men_banner} />,
      },
      {
        path: "women",
        element: <ShopCategory category="women" banner={women_banner} />,
      },
      {
        path: "kids",
        element: <ShopCategory category="kid" banner={kids_banner} />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "login",
        element: <LoginSignup />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

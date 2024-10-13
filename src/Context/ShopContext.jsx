import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);
const getDefaultcart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItem] = useState(getDefaultcart());

  const fetchData = async () => {
    const fetchData = await fetch(
      "https://flipzone-backend.netlify.app/.netlify/functions/api/product/all",
      {
        method: "GET",
      }
    );
    let data = await fetchData.json();
    const updatedProducts = data["products"].map((product) => {
      let newImage =
        "https://flipzone-backend.netlify.app/.netlify/functions/api" +
        product.image.slice(21);
      return {
        ...product,
        image: newImage,
      };
    });
    setAll_product(updatedProducts);

    if (localStorage.getItem("auth-token")) {
      const fetchCartData = await fetch(
        "https://flipzone-backend.netlify.app/.netlify/functions/api/getcart",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
        }
      );
      let cartData = await fetchCartData.json();
      setCartItem(cartData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToCart = async (id) => {
    setCartItem((e) => ({ ...e, [id]: e[id] + 1 }));
    if (localStorage.getItem("auth-token")) {
      const fetchData = await fetch(
        "https://flipzone-backend.netlify.app/.netlify/functions/api/addtocart",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
          body: JSON.stringify({ itemId: id }),
        }
      );
      let data = await fetchData.json();
    }
  };
  const removeFromCart = async (id) => {
    setCartItem((e) => ({ ...e, [id]: e[id] - 1 }));
    if (localStorage.getItem("auth-token")) {
      const fetchData = await fetch(
        "https://flipzone-backend.netlify.app/.netlify/functions/api/removefromcart",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
          body: JSON.stringify({ itemId: id }),
        }
      );
      let data = await fetchData.json();
    }
  };
  const getTotalCartAmount = () => {
    let totalamount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((e) => e.id === Number(item));
        totalamount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalamount;
  };
  const getTotalCartItemCount = () => {
    let totalcount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalcount += cartItems[item];
      }
    }
    return totalcount;
  };
  const contextValue = {
    getTotalCartAmount,
    getTotalCartItemCount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

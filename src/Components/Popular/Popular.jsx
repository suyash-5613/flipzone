import React, { useEffect, useState } from "react";
import "./Popular.css";

import Item from "../Item/Item";

function Popular() {
  const [data_product, setData_product] = useState([]);

  const fetchData = async () => {
    const fetchData = await fetch(
      "https://flipzone-backend.netlify.app/.netlify/functions/api/popularinwomen",
      {
        method: "GET",
      }
    );
    let data = await fetchData.json();
    const updatedProducts = data.map((product) => {
      let newImage =
        "https://flipzone-backend.netlify.app/.netlify/functions/api" +
        product.image.slice(21);
      return {
        ...product,
        image: newImage,
      };
    });
    setData_product(updatedProducts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data_product &&
          data_product.map((item, i) => {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Popular;

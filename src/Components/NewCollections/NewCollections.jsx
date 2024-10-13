import React, { useEffect, useState } from "react";
import "./NewCollections.css";

import Item from "../Item/Item";

function NewCollections() {
  const [new_collection, setNew_collection] = useState([]);

  const fetchData = async () => {
    const fetchData = await fetch(
      "https://flipzone-backend.netlify.app/.netlify/functions/api/newcollection",
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
    setNew_collection(updatedProducts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTION</h1>
      <hr />
      <div className="collections">
        {new_collection &&
          new_collection.map((item, i) => {
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

export default NewCollections;

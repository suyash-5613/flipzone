import React from "react";
import "./DescriptionBox.css";

function DescriptionBox() {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Review (122)</div>
      </div>
      <div className="descriptionbox-description"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas libero placeat laudantium veniam. Dolor quibusdam ipsam facere at culpa fugiat distinctio placeat laborum quisquam, iusto atque pariatur accusantium accusamus officiis!</p></div>
    </div>
  );
}

export default DescriptionBox;

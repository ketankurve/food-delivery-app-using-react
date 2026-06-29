import { IMG1_URL, MAIN_URL } from "../utils/Links";
import { useState, useEffect } from "react";

const Categories = (props) => {
  return (
    <div className="cat-cards">
      <img src={IMG1_URL + props.category.imageId} />
    </div>
  );
};

export default Categories;

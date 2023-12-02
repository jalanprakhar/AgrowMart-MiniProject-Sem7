/*eslint-disable*/
import React from "react";
import { useNavigate } from "react-router-dom";

import fruits from "../img/fruits1.svg";
import dryfruits from "../img/dryfruits1.svg";
import vegetables from "../img/vegetables1.svg";
import dairy from "../img/dairy1.svg";
import livestock from "../img/livestock1.svg";
import seeds from "../img/seeds1.svg";

export default function CategorySection() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-16">
      <div
        className="shadow-lg hover:shadow-xl cursor-pointer"
        onClick={() => handleClick("fruits")}
      >
        <h1 className="text-center mt-6 mb-8 text-2xl font-bold">Fruits</h1>
        <img
          src={fruits}
          alt="fruits"
          className="m-auto max-w-[80%] max-h-28 mb-8"
        />
      </div>
      <div
        className="shadow-lg hover:shadow-xl cursor-pointer"
        onClick={() => handleClick("vegetables")}
      >
        <h1 className="text-center mt-6 mb-8 text-2xl font-bold">Vegetables</h1>
        <img
          src={vegetables}
          alt="vegetables"
          className="m-auto max-w-[80%] max-h-28 mb-8"
        />
      </div>
      <div
        className="shadow-lg hover:shadow-xl cursor-pointer"
        onClick={() => handleClick("dairy")}
      >
        <h1 className="text-center mt-6 mb-8 text-2xl font-bold">Dairy</h1>
        <img
          src={dairy}
          alt="dairy"
          className="m-auto max-w-[80%] max-h-28 mb-8"
        />
      </div>
      <div
        className="shadow-lg hover:shadow-xl cursor-pointer"
        onClick={() => handleClick("dryfruits")}
      >
        <h1 className="text-center mt-6 mb-8 text-2xl font-bold">Dry Fruits</h1>
        <img
          src={dryfruits}
          alt="dryfruits"
          className="m-auto max-w-[80%] max-h-28 mb-8"
        />
      </div>
      <div
        className="shadow-lg hover:shadow-xl cursor-pointer"
        onClick={() => handleClick("livestock")}
      >
        <h1 className="text-center mt-6 mb-8 text-2xl font-bold">Livestock</h1>
        <img
          src={livestock}
          alt="livestock"
          className="m-auto max-w-[80%] max-h-28 mb-8"
        />
      </div>
      <div
        className="shadow-xl hover:shadow-2xl cursor-pointer"
        onClick={() => handleClick("seeds")}
      >
        <h1 className="text-center mt-6 mb-8 text-2xl font-bold">Seeds</h1>
        <img
          src={seeds}
          alt="seeds"
          className="m-auto max-w-[80%] max-h-28 mb-8"
        />
      </div>
    </div>
  );
}

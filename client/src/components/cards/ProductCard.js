import React from "react";

import temp from "../../img/temp/apples.jpg";

import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

export default function ProductCard({ product, category }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (product) => {
    const prod_name = product.name.toLowerCase().replaceAll(" ", "");
    navigate(`/category/${category}/${prod_name}`, {
      state: { id: product.id },
    });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="border border-1 border-slate-700 border-opacity-20">
      <img
        src={temp}
        alt={product.name}
        className="cursor-pointer w-full h-28 sm:h-36 object-cover"
        onClick={() => handleClick(product)}
      />
      <div className="flex flex-col w-[80%] m-auto mt-4 mb-4">
        <div className="cursor-pointer" onClick={()=>handleClick(product)}>
          <p className="text-base text-[#473E3E] font-thin">{product.name}</p>
          <StarRatings
            rating={product.rating}
            starRatedColor="#F4BA4D"
            starDimension="15px"
            starSpacing="2px"
          />
          <p className="text-sm font-bold text-[#473E3E] mt-2">
            ₹{product.price} <span className="font-thin">/ {product.per}</span>
          </p>
          <div className="text-xs mt-2 text-[#A6A6A6]">
            <p>Seller: {product.seller}</p>
            <p className="mt-2">Date Added: {product.date}</p>
          </div>
        </div>
        <button
          className="cursor-pointer rounded-md p-2 font-bold bg-[#3B8056] text-white mt-2 hover:opacity-75"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

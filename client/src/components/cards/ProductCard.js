import React from "react";

import temp from "../../img/temp/apples.jpg";

import StarRatings from 'react-star-ratings';
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product,category }) {

    const navigate = useNavigate();

  const handleClick = (product) => {
    const prod_name  = product.name.toLowerCase().replaceAll(" ", "");;
    navigate(`/category/${category}/${prod_name}`,{state:{id:product.id}});
  };

  return (
    <div className="border border-1 border-slate-700 border-opacity-20 cursor-pointer" onClick={()=>handleClick(product)}>
      <img src={temp} alt={product.name} className="w-full h-28 sm:h-36 object-cover" />
      <div className="flex flex-col w-[80%] m-auto mt-4 mb-4">
        <p className="text-base text-[#473E3E] font-thin">{product.name}</p>
        <StarRatings rating={product.rating} starRatedColor='#F4BA4D' starDimension="15px" starSpacing="2px" />
        <p className="text-sm font-bold text-[#473E3E] mt-2">
          ₹{product.price} <span className="font-thin">/ {product.per}</span>
        </p>
        <div className="text-xs mt-2 text-[#A6A6A6]">
            <p>Seller: {product.seller}</p>
            <p className="mt-2">Date Added: {product.date}</p>
        </div>
        <button className="rounded-md p-2 font-bold bg-[#3B8056] text-white mt-2 hover:opacity-75">Add to Cart</button>
      </div>
    </div>
  );
}

/*eslint-disable*/
import React from "react";
import StarRatings from 'react-star-ratings';
import { useNavigate } from "react-router-dom";
import { quantity_type } from "../../constants";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

export default function ProductCard({ product,category }) {

  const navigate = useNavigate();
  const handleClick = (product) => {
    const prod_name  = product.name.toLowerCase().replaceAll(" ", "");;
    navigate(`/category/${category}/${prod_name}`,{state:{id:product._id}});
  };

  const dispatch = useDispatch();

  const handleAddToCart=(item)=>{
    dispatch(addToCart(item));
  }

  return (
    <div className="border border-1 border-slate-700 border-opacity-20">
      <img src={product.img_url} alt={product.name} className="cursor-pointer w-full h-28 sm:h-36 object-cover" onClick={()=>handleClick(product)}/>
      <div className="flex flex-col w-[80%] m-auto mt-4 mb-4">
        <p className="text-base text-[#473E3E] font-thin">{product.name}</p>
        <StarRatings rating={product.rating} starRatedColor='#F4BA4D' starDimension="15px" starSpacing="2px" />
        <p className="text-sm font-bold text-[#473E3E] mt-2">
          ₹{product.price} <span className="font-thin">/ {quantity_type[product.quantity_type]}</span>
        </p>
        <div className="text-xs mt-2 text-[#A6A6A6]">
            <p className="mt-2">Date Added: {product.date}</p>
        </div>
        <button onClick={() => handleAddToCart(product)} className="rounded-md p-2 font-bold bg-[#3B8056] text-white mt-2 hover:opacity-75">Add to Cart</button>
      </div>
    </div>
  );
}

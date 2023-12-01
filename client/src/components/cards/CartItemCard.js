import React from "react";
import temp from "../../img/temp/apples.jpg";
import { useDispatch } from "react-redux";
import { addToCart, decreaseCart, removeFromCart } from "../../store/cartSlice";

export default function CartItemCard({ item }) {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecreaseCart = (item) => {
    dispatch(decreaseCart(item));
  };

  const handleInreaseCart=(item)=>{
    dispatch(addToCart(item));
  }

  return (
    <div className="grid grid-cols-4 items-center">
      <div className="flex flex-row gap-4 items-center">
        <img src={temp} alt={item.name} className="cursor-pointer h-20 w-24" />
        <div className="flex flex-col">
          <p className="text-base text-[#473E3E] font-bold">{item.name}</p>
          <p className="text-sm text-[#473E3E] mt-2">
            ₹{item.price} <span>/ {item.per}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-row mr-8 h-fit">
        <p onClick={() => handleDecreaseCart(item)} className="rounded-l-md py-2 px-3 border border-1 border-[#636363] border-opacity-50 cursor-pointer">
          -
        </p>
        <p className="py-2 px-3 border border-1 border-[#636363] border-opacity-50">
          {item.cartQuantity}
        </p>
        <p
          onClick={() => handleInreaseCart(item)}
          className="rounded-r-md py-2 px-3 border border-1 border-[#636363] border-opacity-50 cursor-pointer"
        >
          +
        </p>
      </div>
      <div onClick={() => handleRemoveFromCart(item)}>
        <i className="fa-solid fa-trash"></i>
      </div>
    </div>
  );
}

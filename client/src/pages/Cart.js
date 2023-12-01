/*eslint-disable*/
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "../components/cards/CartItemCard";
import { getTotals } from "../store/cartSlice";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);

  return (
    <div className="mt-16 w-[90%] m-auto ">
      {cart.cartItems.length > 0 ? (
        <div>
          <div className="flex flex-col">
            {cart.cartItems.map((item, _index) => {
              return (
                <div key={_index} className="mt-6">
                  <CartItemCard item={item} />
                </div>
              );
            })}
          </div>
          <div className="mt-8 rounded-lg h-[1px] bg-slate-400"></div>
          <div className="mt-8 text-2xl font-bold">Subtotal <span className="font-thin">₹{cart.cartTotalAmount}</span></div>
          <button className="mt-4 py-2 px-6 flex items-center text-sm font-semibold hover:opacity-75 bg-[#3B8056] text-white rounded-md">
            Place Order
          </button>
        </div>
      ) : (
        <div>
          <p>Your cart is currently empty!</p>
          <p>Start Shopping</p>
        </div>
      )}
    </div>
  );
}

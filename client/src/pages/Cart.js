/*eslint-disable*/
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "../components/cards/CartItemCard";
import { clearCart, getTotals } from "../store/cartSlice";
import { api } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function Cart({user}) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);

  const handlePlaceOrder=()=>{
    cart.cartItems.map(async (item,_index)=>{
        try {
            const res = await api.addOrder({
                productId: item._id,
                quantity: item.cartQuantity,
                price: item.price,
            }, item.cartQuantity*item.price, item.farmer_id, user._id);
        } catch (e) {
            return console.log(e.response.data);
        }
    })
    toast.success("Thank you for ordering. The Farmer will contact you soon.");
    dispatch(clearCart());
    navigate("/category/fruits");
    window.location.reload();
  }

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
          <button onClick={()=>handlePlaceOrder()} className="mt-4 py-2 px-6 flex items-center text-sm font-semibold hover:opacity-75 bg-[#3B8056] text-white rounded-md">
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

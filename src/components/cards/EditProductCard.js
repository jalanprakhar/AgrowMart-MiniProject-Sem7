/*eslint-disable*/
import React from 'react'
import temp from "../../img/temp/apples.jpg";
import { useNavigate } from 'react-router';
import { api } from '../../api';
import { toast } from 'react-toastify';
import  { quantity_type } from "../../constants";

export default function EditProductCard({product}) {

    const navigate = useNavigate();

    const editProductHandler=(product)=>{
        navigate(`/myproducts/${product._id}`,{state:{product:product}});
    }

    const deleteProductHandler=()=>{
        api.deleteProduct(product._id).then((res)=>{
            toast.error("Product deleted successfully!")
        }).catch((e)=>console.log(e.response.data));
    }

  return (
    <div className="border border-1 border-slate-700 border-opacity-20 cursor-pointer">
      <img src={product.img_url} alt={product.name} className="w-full h-28 sm:h-36 object-cover" />
      <div className="flex flex-col w-[80%] m-auto mt-4 mb-4">
        <p className="text-base text-[#473E3E] font-thin">{product.name}</p>
        <p className="text-sm font-bold text-[#473E3E] mt-2">
          ₹{product.price} <span className="font-thin">/ {quantity_type[product.quantity_type]}</span>
        </p>
        <div className="text-xs mt-2 text-[#A6A6A6]">
            <p>Quantity: {product.total_quantity}</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
            <button onClick={()=>{editProductHandler(product)}} className="rounded-md p-2 font-bold bg-[#3B8056] text-white mt-2 hover:opacity-75">Edit</button>
            <button onClick={()=>deleteProductHandler(product)} className="rounded-md p-2 font-bold bg-[#3B8056] text-white mt-2 hover:opacity-75">Delete</button>
        </div>
        
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { api } from '../../api';
import { quantity_type } from '../../constants';

export default function OrderCard({order,shopper}) {

    const [product, setProduct]=useState(null);
    const [farmer, setFarmer]=useState(null);

    console.log(order);

    useEffect(()=>{
        api.getSingleProduct(order.orderObject.productId).then((res)=>setProduct(res.data)).catch((e)=>console.log(e.response.data));
    },[])

    useEffect(()=>{
        api.getSelf(shopper?order.farmerId:order.shopperId).then((res)=>setFarmer(res.data)).catch((e)=>e.response.data);
    },[])

    const handleComplete=()=>{
        api.markOrderCompleted(order._id).then((res)=>{
        }).catch((e)=>console.log(e.response.data));
    }

  return (
    <div className="grid grid-cols-3 items-center mt-6">
      <div className="flex flex-row gap-4 items-center">
        <img src={product?.img_url} alt={product?.name} className="cursor-pointer h-20 w-24" />
        <div className="flex flex-col">
          <p className="text-base text-[#473E3E] font-bold">{product?.name}</p>
          <p className="text-sm text-[#473E3E] mt-2">
            ₹{order.orderObject.price} <span>/ {quantity_type[product?.quantity_type]}</span>
          </p>
        </div>
      </div>
      {shopper && <div className="flex flex-col">
          <p className="text-base text-[#473E3E] font-bold">Seller: <span className='font-thin'>{farmer?.name}</span></p>
          <p className="text-sm text-[#473E3E] mt-2 font-bold">
            <i className="text-[#BD966D] fa-solid fa-phone"></i>
                &nbsp;&nbsp;&nbsp; <span className='font-thin'>{farmer?.phone_number}</span>
          </p>
        </div>}
        {!shopper && <div className="flex flex-col">
          <p className="text-base text-[#473E3E] font-bold">Customer: <span className='font-thin'>{farmer?.name}</span></p>
          <p className="text-sm text-[#473E3E] mt-2 font-bold">
            <i className="text-[#BD966D] fa-solid fa-phone"></i>
                &nbsp;&nbsp;&nbsp; <span className='font-thin'>{farmer?.phone_number}</span>
          </p>
        </div>}
        {!shopper && !order.isCompleted && <div onClick={()=>handleComplete()} className="cursor-pointer mt-4 py-2 px-6 w-fit flex items-center text-sm font-semibold hover:opacity-75 bg-[#3B8056] text-white rounded-md">
                Mark Complete
            </div>}
    </div>
  )
}

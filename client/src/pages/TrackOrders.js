/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import { api } from '../api';
import OrderCard from '../components/cards/OrderCard';

export default function TrackOrders({user}) {

  const[orders, setOrders]=useState([]);

  useEffect(()=>{
    api.getAllOrdersByShopper(user._id).then((res)=>{
      setOrders(res.data);
    }).catch((e)=>console.log(e.response.data));
  },[user])

  const pending=orders.filter((order)=>order.isCompleted===false);
  const completed=orders.filter((order)=>order.isCompleted===true);

  return (
    <div className='w-[90%] m-auto'>
      {pending.length>0 && <><h1 className='text-lg md:text-2xl font-semibold text-center mt-14'>Pending Orders</h1>
      <div>
        {pending.map((order,_index)=>{
          return <OrderCard order={order} shopper={true} key={_index}/>
        })}
      </div></>}
      {completed.length>0 && <><h1 className='text-lg md:text-2xl font-semibold text-center mt-14'>Completed Orders</h1>
      <div>
        {completed.map((order,_index)=>{
          return <OrderCard order={order} shopper={true} key={_index}/>
        })}
      </div></>}
    </div>
  )
}

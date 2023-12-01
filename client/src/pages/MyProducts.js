import React, { useEffect, useState } from 'react'
import EditProductCard from '../components/cards/EditProductCard';
import { api } from '../api';
import { useCookies } from "react-cookie";

export default function MyProducts() {

    const [products, setproducts]=useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    useEffect(()=>{
        api.getProductsByFarmerID(cookies["UserId"]).then((res)=>setproducts(res.data)).catch();
    },[])

  return (
    <div className="w-[90%] m-auto mt-16">
        {products.length>0 && <>
            <h1 className='text-center font-bold text-2xl mb-8'>My Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.map((product, _index) => (
              <div key={_index}>
                <EditProductCard product={product} />
              </div>
            ))}
        </div>
        </>}
        {
            products.length===0 && <h1 className='text-center font-bold text-3xl mb-8'>No Products to display.</h1>
        }
      </div>
  )
}

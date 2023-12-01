import React from 'react'
import EditProductCard from '../components/cards/EditProductCard';

const products = [
    {
      id:1,
      name: "Apple",
      img: "",
      price: 100,
      per: "kg",
      date: "2021-10-10",
      seller: "Rahul Farms",
      rating: 4,
      quantity:10
    },
    {
      id:2,
      name: "Banana",
      img: "",
      price: 100,
      per: "dozen",
      date: "2021-10-10",
      seller: "Rahul Farms",
      rating: 3,
      quantity:10
    },
  ];

export default function MyProducts() {
  return (
    <div className="w-[90%] m-auto mt-16">
        <h1 className='text-center font-bold text-2xl mb-8'>My Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.map((product, _index) => (
              <div key={_index}>
                <EditProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
  )
}

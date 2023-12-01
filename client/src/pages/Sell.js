import React from "react";
import { useForm } from "react-hook-form";

export default function Sell() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    productName: "",
    category: "",
    price: 0,
    quantityType: "",
    quantity:0,
    about:""
  });
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div className="m-auto w-[80%] items-center h-[100%] mt-[70px]">
      <h1 className="text-lg md:text-2xl font-semibold text-center">
        Add your Product!
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center text-sm md:text-md mt-4 md:mt-8"
      >
        <div className="md:grid md:grid-cols-2 md:gap-10 w-[80%] justify-center">
          <div className="md:col-span-1 flex flex-col">
            <label htmlFor="productName" className="font-semibold text-slate-500">
              Product Name
            </label>
            <input
              type="text"
              className="border-[1.5px] border-slate-400 rounded-md mt-1 mb-10 px-2 py-3"
              placeholder="Product Name"
              {...register("productName", { required: true, maxLength: 100 })}
            />
            <label htmlFor="Price" className="font-semibold text-slate-500">
              Price (Rs.)
            </label>
            <input
              type="number"
              className="border-[1.5px] border-slate-400 rounded-md mt-1 mb-10 px-2 py-3"
              placeholder="Price"
              {...register("price", { required: true })}
            />
            <label htmlFor="Quantity" className="font-semibold text-slate-500">
              Quantity
            </label>
            <input
              type="number"
              className="border-[1.5px] border-slate-400 rounded-md mt-1 mb-10 px-2 py-3"
              placeholder="Quantity"
              {...register("quantity", { required: true })}
            />
          </div>

          <div className="md:col-span-1 flex flex-col">
            <label htmlFor="category" className="font-semibold text-slate-500">
              Select category
            </label>
            <select placeholder="Select Category" {...register("category")} className="border-[1.5px] border-slate-400 rounded-md mt-1 mb-10 px-2 py-3">
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="dairy">Dairy</option>
                <option value="dryFruits">Dry Fruits</option>
                <option value="livestock">Livestock</option>
                <option value="seeds">Seeds</option>
            </select>
            <label htmlFor="quantityType" className="font-semibold text-slate-500">
               Select Quantity Type
            </label>
            <select placeholder="Select Quantity Type" {...register("quantityType")} className="border-[1.5px] border-slate-400 rounded-md mt-1 mb-10 px-2 py-3">
                <option value="piece">Piece (each)</option>
                <option value="dozen">Dozen (dz)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="gram">Grams (g)</option>
                <option value="litre">Litres (L)</option>
                <option value="ml">Milli Litres (ml)</option>
            </select>
            {/* TODO: Add upload photo */}
          </div>
        </div>
        <div className="grid grid-cols-1 w-[80%] flex flex-col">
            <label htmlFor="Quantity" className="font-semibold text-slate-500">
              About
            </label>
            <textarea
              type="number"
              className="resize-none border-[1.5px] border-slate-400 rounded-md mt-1 mb-10 px-2 py-3"
              placeholder="Description about the Product."
              {...register("about", { required: true })}
            />
        </div>
        <input
          type="submit"
          className="cursor-pointer w-[80%] py-3 px-7 text-center text-md font-semibold hover:opacity-75 bg-[#3B8056] text-white rounded-md"
        />
      </form>
    </div>
  );
}

/*eslint-disable*/
import React from "react";
import { useForm } from "react-hook-form";
import { api } from "../api";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import  { categories, quantity_type } from "../constants";

export default function Sell() {

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate=useNavigate();

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
    about:"",
    img_url:"",
  });
  const onSubmit = (data) =>{
    let cat,type;
    for(let i=0;i<6;i++){
      if(categories[i]===data.category){
        cat=i;
        break;
      }
    }
    for(let i=0;i<6;i++){
      if(quantity_type[i]===data.quantityType){
        type=i;
        break;
      }
    }
    api.addProduct(data.productName,cat,data.quantity,type,data.img_url,data.price,cookies["UserId"],data.about).then((res)=>{
      toast.success("Product added successfully!");
      navigate('/myproducts');
    }).catch((e)=>e.response.data);
  };

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
            <label
              htmlFor="productName"
              className="font-semibold text-slate-500"
            >
              Product Name
            </label>
            <div className="mb-10">
              <input
                type="text"
                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                placeholder="Product Name"
                {...register("productName", { required: true, maxLength: 100 })}
              />
              {errors.productName?.type === "required" && (
                <p className="text-red-500">Product name is required.</p>
              )}
            </div>
            <label htmlFor="Price" className="font-semibold text-slate-500">
              Price (Rs.)
            </label>
            <div className="mb-10">
              <input
                type="number"
                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                placeholder="Price"
                {...register("price", { required: true })}
              />
              {errors.price?.type === "required" && (
                <p className="text-red-500">Price is required.</p>
              )}
            </div>
            <label htmlFor="Quantity" className="font-semibold text-slate-500">
              Quantity
            </label>
            <div className="mb-10">
              <input
                type="number"
                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                placeholder="Quantity"
                {...register("quantity", { required: true })}
              />
              {errors.quantity?.type === "required" && (
                <p className="text-red-500">Quantity is required.</p>
              )}
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col">
            <label htmlFor="category" className="font-semibold text-slate-500">
              Select category
            </label>
            <div className="mb-10">
              <select
                placeholder="Select Category"
                {...register("category")}
                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
              >
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="dairy">Dairy</option>
                <option value="dryfruits">Dry Fruits</option>
                <option value="livestock">Livestock</option>
                <option value="seeds">Seeds</option>
              </select>
              {errors.category?.type === "required" && (
                <p className="text-red-500">Category is required.</p>
              )}
            </div>
            <label
              htmlFor="quantityType"
              className="font-semibold text-slate-500"
            >
              Select Quantity Type
            </label>
            <div className="mb-10">
              <select
                placeholder="Select Quantity Type"
                {...register("quantityType")}
                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
              >
                <option value="piece">Piece (each)</option>
                <option value="dozen">Dozen (dz)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="gram">Grams (g)</option>
                <option value="litre">Litres (L)</option>
                <option value="ml">Milli Litres (ml)</option>
              </select>
              {errors.quantityType?.type === "required" && (
                <p className="text-red-500">Quantity Type is required.</p>
              )}
            </div>

            <label htmlFor="img_url" className="font-semibold text-slate-500">
              Image Url
            </label>
            <div className="mb-10">
              <input
                type="url"
                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                placeholder="Url"
                {...register("img_url", { required: true })}
              />
              {errors.img_url?.type === "required" && (
                <p className="text-red-500">Image is required.</p>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 w-[80%] flex flex-col">
          <label htmlFor="Quantity" className="font-semibold text-slate-500">
            About
          </label>
          <div className="mb-10">
            <textarea
              type="number"
              className="resize-none border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
              placeholder="Description about the Product."
              {...register("about", { required: true })}
            />
            {errors.about?.type === "required" && (
              <p className="text-red-500">About is required.</p>
            )}
          </div>
        </div>
        <input
          type="submit"
          className="cursor-pointer w-[80%] py-3 px-7 text-center text-md font-semibold hover:opacity-75 bg-[#3B8056] text-white rounded-md"
        />
      </form>
    </div>
  );
}

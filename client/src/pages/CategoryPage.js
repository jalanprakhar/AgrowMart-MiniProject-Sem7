import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import ProductCard from "../components/cards/ProductCard";
import { api } from "../api";
import {categories} from "../constants";

export default function CategoryPage() {

  const [allProducts, setAllProducts]=useState([]);
  const [products, setProducts]=useState([]);

  useEffect(()=>{
    api.getAllProducts().then((res)=> setAllProducts(res.data)).catch((e)=>{
      console.log(e.response.data);
    })
  },[])

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const location = useLocation();
  const categoryName = location.pathname.slice(10);
  const displayCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  const Categoryoptions = [
    "Fruits",
    "Vegetables",
    "Dairy",
    "Dry Fruits",
    "Livestock",
    "Seeds",
  ];
  function binarySearch(category){
    let ans=-1;
    let lo=0;
    let hi=allProducts.length-1;
    while(lo<=hi){
      let mid=lo+Math.floor((hi-lo)/2);
      if(allProducts[mid].category<category){
        lo=mid+1;
      }
      else if(allProducts[mid].category>category){
        hi=mid-1;
      }
      else{
        ans=mid;
        hi=mid-1;
      }
    }
    return ans;
  }
  const [selectedCategory, setSelectedCategory] = useState(displayCategoryName);
  const CategorySelect = (e) => {
    setSelectedCategory(e.value);
    const linkto = e.value.toLowerCase().replaceAll(" ", "");
    navigate(`/category/${linkto}`, { state: { name: linkto } });
  };

  const Sortoptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Rating: Low to High",
    "Rating: High to Low",
  ];
  const [selectedSort, setSelectedSort] = useState("");
  const SortSelect = (e) => {
    setSelectedSort(e.value);
  };

  
  useEffect(()=>{
    if(allProducts.length>0){
      const s=selectedCategory.toLowerCase();
      const k=categories.findIndex((item)=>item===s);
      let idx=binarySearch(k);
      console.log(idx)
      let list=[];
      if(idx!==-1){
        console.log("here");
        for(let i=idx;i<allProducts.length;i++){
          console.log(i);
          if(categories[allProducts[i].category]!==selectedCategory.toLowerCase()) break;
          list.push(allProducts[i]);
        }
      }
      setProducts(list);
    }
  },[selectedCategory,allProducts])

  return (
    <div>
      <div className="bg-[#F8F8F8]">
        <div className="pt-16 md:pt-24 w-[90%] m-auto pb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            {displayCategoryName}
          </h1>
          <div className="flex flex-col lg:flex-row justify-between lg:items-center m-auto mt-6 lg:mt-10">
            <div className="flex flex-row mt-4 lg:mt-0">
              <p className="text-base md:text-lg mr-2">Categories:</p>
              <div className="w-36 text-sm">
                <Dropdown
                  options={Categoryoptions}
                  onChange={CategorySelect}
                  value={selectedCategory}
                  placeholder="Select an option"
                />
              </div>
            </div>
            <div className="flex flex-row mt-4 lg:mt-0 items-center">
              <p className="text-base md:text-lg mr-2">Search Product:</p>
              <div className="flex flex-row items-center border-2 rounded">
                <input
                  className="w-36 p-1.5 focus:outline-none"
                  placeholder="Search..."
                  onChange={(event) => setQuery(event.target.value)}
                />
                <i className="fa-solid fa-magnifying-glass mr-2 ml-2"></i>
              </div>
            </div>
            <div className="flex flex-row mt-4 lg:mt-0">
              <p className="text-base md:text-lg mr-2">Sort By:</p>
              <div className="w-48 text-sm">
                <Dropdown
                  options={Sortoptions}
                  onChange={SortSelect}
                  value={selectedSort}
                  placeholder="Select an option"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] m-auto mt-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products
            .filter((product) => {
              if (query === "") {
                return product;
              } else if (
                product.name
                  .replaceAll(" ", "")
                  .toLowerCase()
                  .includes(query.replaceAll(" ", "").toLowerCase())
              ) {
                return product;
              } else {
                return null;
              }
            })
            .map((product, _index) => (
              <div key={_index}>
                <ProductCard product={product} category={categoryName} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
/*eslint-disable*/
import React from "react";
import logo from "../img/logo.png";

export default function Footer() {
  return (
    <div className="bg-[#F8F8F8] mt-24">
      <div className="flex flex-col md:flex-row items-center pt-12 pb-12 lg:px-32">
        <div className="basis-1/3 flex flex-col m-auto justify-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <div className="basis-1/3 mt-10 md:mt-0">
          <h1 className="text-lg font-bold mb-2">Contact</h1>
          <div className="text-sm text-[#473E3E]">
            <p className="mb-1 cursor-pointer">
              <i className="text-[#3B8056] fa-solid fa-envelope"></i>
              &nbsp;&nbsp;&nbsp;agrowmart@gmail.com
            </p>
            <p className="mb-1 cursor-pointer">
              <i className="text-[#3B8056] fa-solid fa-location-dot"></i>
              &nbsp;&nbsp;&nbsp;144/01 Tulsi Street, Delhi
            </p>
            <p className="mb-1 cursor-pointer">
              <i className="text-[#3B8056] fa-solid fa-phone"></i>
              &nbsp;&nbsp;&nbsp;+91 9895656789
            </p>
          </div>
        </div>
        <div className="basis-1/3 hidden md:block">
          <h1 className="text-lg font-bold mb-2">Links</h1>
          <div className="text-sm text-[#473E3E]">
            <p className="mb-1 cursor-pointer">Farmers</p>
            <p className="mb-1 cursor-pointer">Shoppers</p>
            <p className="mb-1 cursor-pointer">Support</p>
          </div>
        </div>
      </div>
      <div className=" h-[1px] bg-slate-700 w-[90%] m-auto opacity-20"></div>
      <div className="flex flex-row pt-2 pb-2 items-center">
        <p className="text-xs md:text-sm basis-1/2 text-center">
          ©AgrowMart - All Rights Reserved
        </p>
        <div className="text-[#3B8056] basis-1/2 text-center text-base md:text-lg">
          <i className="fa-brands fa-facebook mr-6"></i>
          <i className="fa-brands fa-instagram mr-6"></i>
          <i className="fa-brands fa-twitter"></i>
        </div>
      </div>
    </div>
  );
}

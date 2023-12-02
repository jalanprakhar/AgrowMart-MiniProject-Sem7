/*eslint-disable*/
import React from "react";
import MultiSlider from "../components/MultiSlider";

import banner from "../img/banner.svg";
import home1 from "../img/home1.svg";
import home2 from "../img/home2.svg";
import CategorySection from "../components/CategorySection";
import { useNavigate } from "react-router-dom";

const reviews = [
  {
    name: "Lorem Ipsum",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    name: "Lorem Ipsum",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    name: "Lorem Ipsum",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    name: "Lorem Ipsum",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    name: "Lorem Ipsum",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
];

export default function Home() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/fruits`);
  };
  
  return (
    <div className="m-auto w-[90%]">
      <img
        src={banner}
        className="mt-[70px] m-auto w-[100%] rounded-xl"
        alt="logo"
      />

      <div className="mt-12 md:mt-16">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          What We Offer
        </h1>
        <div className="flex flex-col md:flex-row items-center mt-8 md:mt-16">
          <div className="basis-1/2 order-2 md:order-1">
            <div className="m-auto w-[90%] lg:w-[80%] xl:w-[70%] text-center md:text-left">
              <h4 className="text-2xl md:text-4xl font-bold text-[#3B8056] mt-6 md:mt-0">
                Build your Farm Business
              </h4>
              <p className="text-md md:text-lg lg:text-xl mt-4 md:mt-6 font-thin">
                Sell directly to customers, set your own schedule and increase
                sales
              </p>
              <button className="text-md md:text-lg text-white font-semibold mt-4 md:mt-6 px-6 py-2 bg-[#BD966D] rounded-md">
                Start Selling
              </button>
            </div>
          </div>
          <div className="basis-1/2 order-1 md:order-2">
            <img
              src={home1}
              alt="home"
              className="m-auto max-w-[80%] rounded-2xl drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center mt-8 md:mt-16">
          <div className="basis-1/2 order-2">
            <div className="m-auto w-[90%] lg:w-[80%] xl:w-[70%]  text-center md:text-left">
              <h4 className="text-2xl md:text-4xl font-bold text-[#3B8056] mt-6 md:mt-0">
                Shop from Farmers Directly
              </h4>
              <p className="text-md md:text-lg lg:text-xl mt-4 md:mt-6 font-thin">
                Buy Directly from Farmers anywhere in our country, at anytime
              </p>
              <button className="text-md md:text-lg font-semibold text-white mt-4 md:mt-6 px-6 py-2 bg-[#BD966D] rounded-md"
              onClick={handleClick}>
                Go to Marketplace
              </button>
            </div>
          </div>
          <div className="basis-1/2 order-1">
            <img
              src={home2}
              alt="home"
              className="m-auto max-w-[80%] rounded-2xl drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-20">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Why Choose Us?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-16 xl:gap-28 w-[70%] md:w-[90%] xl:w-[80%] m-auto mt-8 md:mt-16 text-center">
          <div className="shadow-xl">
            <p>
              <i className="fa-solid fa-cart-shopping text-3xl lg:text-4xl mt-8 text-[#3B8056]"></i>
            </p>
            <h1 className="text-md lg:text-xl m-4 font-semibold">
              Buy and Sell Directly
            </h1>
            <p className="text-sm lg:text-md w-[90%] lg:w-[80%] m-auto mb-4 text-[#636363]">
              We accomodate direct transactions between buyers and sellers
            </p>
          </div>

          <div className="shadow-xl">
            <p>
              <i className="fa-solid fa-map-location-dot text-3xl lg:text-4xl mt-8 text-[#3B8056]"></i>
            </p>
            <h1 className="text-md lg:text-xl m-4 font-semibold">
              Anywhere, Anytime
            </h1>
            <p className="text-sm lg:text-md w-[90%] lg:w-[80%] m-auto mb-4 text-[#636363]">
              Unlimited access to a global market from anywhere, at anytime
            </p>
          </div>

          <div className="shadow-xl">
            <p>
              <i className="fa-solid fa-hand-holding-hand text-3xl lg:text-4xl mt-8 text-[#3B8056]"></i>
            </p>
            <h1 className="text-md lg:text-xl m-4 font-semibold">
              Friendly and Safe
            </h1>
            <p className="text-sm lg:text-md w-[90%] lg:w-[80%] m-auto mb-4 text-[#636363]">
              A user-friendly platform that generates market opportunities
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Shop By Category
        </h1>
        <CategorySection/>
      </div>

      <div className="mt-16 md:mt-24">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Reviews</h1>
        <div className="mt-16">
          <MultiSlider items={reviews} review={true} />
        </div>
      </div>
    </div>
  );
}

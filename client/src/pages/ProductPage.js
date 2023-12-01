import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import StarRatings from "react-star-ratings";
import temp from "../img/temp/apples.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import temp1 from "../img/temp/profuser 2.png";


export default function ProductPage() {
  const location = useLocation();
  const productId = location.state.id;

  const [product, setProduct] = useState({
    id: 1,
    name: "Apple",
    category: "fruits",
    img: "",
    price: 100,
    per: "kg",
    date: "2021-10-10",
    seller: "Rahul Farms",
    contact: "+91 9876543210",
    email: "lorem@gmail.com",
    rating: 4,
    number_of_ratings: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reviews: [
      {
        name: "Lorem Ipsum",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        ratings: 3,
      },
      {
        name: "Lorem Ipsum",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        ratings: 4,
      },
    ],
  })
  const [rating, setRating] = useState(0);
  const [ratingDesc, setRatingDesc] = useState("");
  const [writeReview, setWriteReview] = useState(false);

  const handleChangeRating = (newRating) => {
    setRating(newRating);
  };

  const onSubmitReview=()=>{
    if(rating>0){
      setProduct((prevProduct)=>({
        ...prevProduct,
        reviews:[
          ...prevProduct.reviews,
          {
            name:product.seller,
            desc:ratingDesc,
            ratings:rating
          }
        ]
      }))
    }
    else{
      toast.error("Please select any rating to submit.")
    }
  }

  return (
    <div className="w-[90%] m-auto mt-16 md:mt-24">
      <div className="flex flex-col md:flex-row items-center">
        <div className="basis-1/2">
          <img
            src={temp}
            alt={product.name}
            className="mt-6 md:mt-0 w-[80%] md:w-[90%] m-auto h-72 md:h-80 object-cover"
          />
        </div>

        <div className="basis-1/2">
          <div className="w-[90%] m-auto">
            <h1 className="text-xl md:text-3xl font-bold mt-6 md:mt-0">
              {product.name}
            </h1>
            <p className="text-base mt-6 text-[#636363]">
              {product.description}
            </p>
            <p className="text-lg md:text-xl font-bold text-[#473E3E] mt-6">
              ₹{product.price}{" "}
              <span className="font-thin">/ {product.per}</span>
            </p>
            <div className="flex flex-col lg:flex-row mt-6 text-sm md:text-base">
              <div className="flex flex-row mt-4 lg:mt-0">
                <button className="rounded-md py-2 px-5 md:px-3 lg:px-5 font-thin bg-[#3B8056] text-white hover:opacity-75 w-fit mr-4">
                  <i className="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;Add
                  to Cart
                </button>
                <button className="rounded-md py-2 px-5 md:px-3 lg:px-5 font-bold bg-white text-[#3B8056] border border-1 border-[#3B8056] hover:opacity-75 w-fit">
                  <i className="fa-regular fa-heart"></i>&nbsp;&nbsp;Add to
                  Favourites
                </button>
              </div>
            </div>
            <div className="mt-8 text-sm text-[#636363]">
              <p>
                <span className="font-bold">Date:</span> {product.date}
              </p>
              <p className="mt-1">
                <span className="font-bold">Category:</span>{" "}
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
              </p>
              <p className="mt-1">
                <span className="font-bold">Seller:</span> {product.seller}
              </p>
            </div>
            <div className="mt-8 text-sm text-[#636363]">
              <p className="font-bold">Contact Seller:</p>
              <p className="mt-1">
                <i className="text-[#BD966D] fa-solid fa-phone"></i>
                &nbsp;&nbsp;&nbsp;{product.contact}
              </p>
              <p className="mt-1">
                <i className="text-[#BD966D] fa-solid fa-envelope"></i>
                &nbsp;&nbsp;&nbsp;{product.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex flex-row justify-between">
          <p className="text-[#3B8056] font-thin text-xl">Reviews</p>
          <button onClick={()=>setWriteReview(!writeReview)} className="rounded-md py-1.5 px-3 font-bold bg-white text-[#BD966D] border border-1 border-[#BD966D] hover:opacity-75 w-fit">
            <i className="fa-solid fa-pen"></i>&nbsp;&nbsp;Write a review
          </button>
        </div>
        <div className="h-0.5 mt-2 opacity-20 bg-[#636363]"></div>
        {writeReview && <div className="mt-4 flex flex-col m-auto">
          <StarRatings
            rating={rating}
            changeRating={handleChangeRating}
            starRatedColor="#F4BA4D"
            starHoverColor="#F4BA4D"
            starDimension="40px"
            starSpacing="2px"
          />
          <textarea
            value={ratingDesc}
            onChange={(e) => setRatingDesc(e.target.value)}
            type="number"
            className="resize-none border-[1.5px] border-slate-400 rounded-md mt-4 px-2 py-3"
            placeholder="Write your review about the Product."
          />
          <input
            onClick={onSubmitReview}
            type="submit"
            className="mt-4 cursor-pointer w-fit py-3 px-7 text-center text-md font-semibold hover:opacity-75 bg-[#3B8056] text-white rounded-md"
          />
        </div>}
        {product.reviews.map((review,_index)=>{
          return <div className="flex flex-row mt-8 items-center" key={_index}>
          <img src={temp1} alt="profile" className="h-14 mr-2"/>
          <div className="flex flex-col">
            <p className="font-bold">{review.name}</p>
            <StarRatings rating={review.ratings} starRatedColor='#F4BA4D' starDimension="15px" starSpacing="2px" />
            {review.desc.length>0 && <p className="text-sm">{review.desc}</p>}
          </div>
        </div>
        })}
      </div>
    </div>
  );
}

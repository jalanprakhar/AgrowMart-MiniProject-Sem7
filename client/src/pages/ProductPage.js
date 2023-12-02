/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StarRatings from "react-star-ratings";
import temp from "../img/temp/apples.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import temp1 from "../img/temp/profuser 2.png";
import { api } from "../api";
import { categories, quantity_type } from "../constants";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";


export default function ProductPage({user}) {
  const location = useLocation();
  const productId = location.state.id;

  const [product, setProduct] = useState(null);
  const [farmer, setFarmer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [ratingDesc, setRatingDesc] = useState("");
  const [writeReview, setWriteReview] = useState(false);

  useEffect(()=>{
    api.getSingleProduct(productId).then((res)=>setProduct(res.data)).catch((e)=>e.response.data);
  },[productId])

  useEffect(()=>{
    if(product){
      api.getSelf(product.farmer_id).then((res)=>setFarmer(res.data)).catch((e)=>e.response.data);
      api.getReview(product._id).then((res)=>setReviews(res.data)).catch((e)=>e.response.data);
    }
  },[product])

  const handleChangeRating = (newRating) => {
    setRating(newRating);
  };

  const onSubmitReview=()=>{
    if(rating>0){
      api.addReview(user.name,ratingDesc,rating,productId).then((res)=>{
        setReviews((prev)=>
          [...prev,res.data]);
        toast.success("Thanks for your review!")
      }).catch((e)=>console.log(e));
    }
    else{
      toast.error("Please select any rating to submit.")
    }
    setRating(0);
    setRatingDesc("");
  }

  const dispatch = useDispatch();

  const handleAddToCart=(item)=>{
    dispatch(addToCart(item));
  }

  return (
    <div className="w-[90%] m-auto mt-16 md:mt-24">
      <div className="flex flex-col md:flex-row items-center">
        <div className="basis-1/2">
          <img
            src={product?.img_url}
            alt={product?.name}
            className="mt-6 md:mt-0 w-[80%] md:w-[90%] m-auto h-72 md:h-80 object-cover"
          />
        </div>

        <div className="basis-1/2">
          <div className="w-[90%] m-auto">
            <h1 className="text-xl md:text-3xl font-bold mt-6 md:mt-0">
              {product?.name}
            </h1>
            <p className="text-base mt-6 text-[#636363]">
              {product?.desc}
            </p>
            <p className="text-lg md:text-xl font-bold text-[#473E3E] mt-6">
              ₹{product?.price}{" "}
              <span className="font-thin">/ {quantity_type[product?.quantity_type]}</span>
            </p>
            <div className="flex flex-col lg:flex-row mt-6 text-sm md:text-base">
              <div className="flex flex-row mt-4 lg:mt-0">
                <button onClick={() => handleAddToCart(product)} className="rounded-md py-2 px-5 md:px-3 lg:px-5 font-thin bg-[#3B8056] text-white hover:opacity-75 w-fit mr-4">
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
                <span className="font-bold">Date:</span> {product?.date}
              </p>
              <p className="mt-1">
                <span className="font-bold">Category:</span>{" "}
                {product && categories[product?.category].charAt(0).toUpperCase() +
                  categories[product?.category].slice(1)}
              </p>
              <p className="mt-1">
                <span className="font-bold">Seller:</span> {farmer?.name}
              </p>
            </div>
            <div className="mt-8 text-sm text-[#636363]">
              <p className="font-bold">Contact Seller:</p>
              <p className="mt-1">
                <i className="text-[#BD966D] fa-solid fa-phone"></i>
                &nbsp;&nbsp;&nbsp;{farmer?.phone_number}
              </p>
              <p className="mt-1">
                <i className="text-[#BD966D] fa-solid fa-envelope"></i>
                &nbsp;&nbsp;&nbsp;{farmer?.email}
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
        {reviews.map((review,_index)=>{
          return <div className="flex flex-row mt-8 items-center" key={_index}>
          <img src={temp1} alt="profile" className="h-14 mr-2"/>
          <div className="flex flex-col">
            <p className="font-bold">{review?.name}</p>
            <StarRatings rating={review?.rating} starRatedColor='#F4BA4D' starDimension="15px" starSpacing="2px" />
            {review?.desc.length>0 && <p className="text-sm">{review?.desc}</p>}
          </div>
        </div>
        })}
      </div>
    </div>
  );
}

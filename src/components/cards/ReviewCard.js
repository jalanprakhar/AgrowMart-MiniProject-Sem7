/*eslint-disable*/
import React from "react";
import temp from "../../img/temp/profuser 2.png";

export default function ReviewCard({ review, ind }) {
  return (
    <div
      className={`flex flex-col items-center shadow-md w-[95%] border border-1 border-slate-700 border-opacity-5`}
    >
      <img src={temp} alt="img" className="rounded-full h-20 mt-4" />
      <h1 className="mt-2 font-bold text-lg">{review.name}</h1>
      <p className="w-[90%] m-auto text-center mt-2 mb-4 text-[#473E3E] font-thin text-sm">
        {review.desc}
      </p>
    </div>
  );
}

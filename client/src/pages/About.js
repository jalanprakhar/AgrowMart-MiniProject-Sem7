import React from "react";
import about from "../img/about.jpg";

export default function About() {
  return (
    <div className="m-auto w-[90%]">
      <img
        src={about}
        className="mt-[70px] m-auto w-[100%] rounded-xl"
        alt="about"
      />
      <div className="mt-12 md:mt-16">
        <h1 className="text-[#3B8056] text-2xl md:text-4xl font-bold text-center">
          Our Mission
        </h1>
        <p className="mt-10 text-xl text-center">
          AgrowMart, an innovative online platform is set to revolutionize the
          agricultural sector. Our mission is straightforward: empower farmers
          and make it easy for consumers to access fresh, healthy produce.
          Farmers using AgrowMart can sell their harvests directly to consumers,
          cutting out middlemen for a fairer process. We take it a step further
          by providing farmers personalized advice on crops and fertilizers
          based on their soil data, helping them make better decisions for
          better yields. We also use advanced technology to spot and address
          crop diseases early on. This not only protects crops but also promotes
          sustainability in farming. AgrowMart's vision goes beyond just
          transactions; we're here to simplify farming, promote sustainable
          practices, and give consumers a direct link to the freshest produce.
          In a nutshell, AgrowMart is making farming easier, more sustainable,
          and ensuring you get the freshest produce straight from the source.
        </p>
      </div>
    </div>
  );
}

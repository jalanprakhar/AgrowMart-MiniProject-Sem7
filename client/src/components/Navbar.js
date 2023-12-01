import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import temp from "../img/temp/profuser 2.png";
import { useSelector } from "react-redux";

export default function Navbar({ user }) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const clickedOutside = (e) => {
      if (navbarOpen && ref.current && !ref.current.contains(e.target)) {
        setNavbarOpen(false);
      }
    };
    document.addEventListener("mousedown", clickedOutside);

    return () => {
      document.removeEventListener("mousedown", clickedOutside);
    };
  }, [navbarOpen]);

  const {cartTotalQuantity}=useSelector(state=> state.cart);

  return (
    <div className="fixed w-full top-0 z-20" ref={ref}>
      <nav
        className={`relative flex flex-wrap items-center justify-between px-2 py-1 mb-3 bg-white`}
      >
        <div className="container px-6 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-2xl font-bold leading-relaxed mr-4 my-2 whitespace-nowrap text-[#636363] flex flex-row"
              to="/"
            >
              <img src={logo} className="h-6 mt-2" alt="logo" />
            </Link>
            <button
              className=" cursor-pointer leading-none mx-6 my-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              {!navbarOpen && (
                <i className="fa-solid fa-bars text-[#2f2e41] text-2xl"></i>
              )}
              {navbarOpen && (
                <i className="fa-solid fa-x text-[#2f2e41] text-2xl"></i>
              )}
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto justify-center lg:items-center">
              <li className="nav-item">
                <Link
                  className={
                    "mx-6 my-2 flex items-center text-sm font-semibold leading-snug text-[#636363] hover:opacity-75"
                  }
                  to="/about"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  About
                </Link>
              </li>
              {user.role==="shopper" && 
              <>
              <li className="nav-item">
                <Link
                  className={
                    "mx-6 my-2 flex items-center text-sm font-semibold leading-snug text-[#636363] hover:opacity-75"
                  }
                  to="/category/fruits"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  Marketplace
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    "mx-6 my-2 flex items-center text-sm font-semibold leading-snug text-[#636363] hover:opacity-75"
                  }
                  to="/trackorders"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  Track Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    "mx-6 my-2 flex items-center text-xl font-semibold leading-snug text-red-500 hover:opacity-75"
                  }
                  to="/favourites"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  <i className="fa-solid fa-heart"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    "mx-6 my-2 flex items-center text-xl font-semibold leading-snug text-[#636363] hover:opacity-75"
                  }
                  to="/cart"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  <i className="fa-solid fa-cart-shopping"></i><span className="text-sm ml-1 text-white bg-red-500 rounded-full px-2 py-0.5">{cartTotalQuantity}</span>
                </Link>
              </li>
              </>
              }
              {user.role==="farmer" && <>
              <li className="nav-item">
                <Link
                  className={
                    "mx-6 my-2 flex items-center text-sm font-semibold leading-snug text-[#636363] hover:opacity-75"
                  }
                  to="/myproducts"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  My Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    "mx-6 my-2 flex items-center text-sm font-semibold leading-snug text-[#636363] hover:opacity-75"
                  }
                  to="/processorders"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  Process Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    "mx-6 my-2 py-2 px-6 flex items-center text-sm font-semibold leading-snug hover:opacity-75 border-2 border-[#BD966D] text-[#BD966D] rounded-md"
                  }
                  to="/sell"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  Sell
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    "mx-6 my-2 py-2 px-6 flex items-center text-sm font-semibold leading-snug hover:opacity-75 bg-[#BD966D] text-white rounded-md"
                  }
                  to="/soiltesting"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  Soil Testing
                </Link>
              </li>
              </>}
              {!user && <>
                <li className="nav-item">
                <Link
                  className={
                    "mx-6 my-2 py-2 px-6 flex items-center text-sm font-semibold leading-snug hover:opacity-75 bg-[#3B8056] text-white rounded-md"
                  }
                  to="/signup"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    "mx-6 my-2 py-2 px-6 flex items-center text-sm font-semibold leading-snug hover:opacity-75 border-2 border-[#3B8056] text-[#3B8056] rounded-md"
                  }
                  to="/login"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  Login
                </Link>
              </li>
              </>}
              <li className="nav-item">
                <Link
                  className={
                    "mx-6 my-2 flex items-center text-sm font-semibold leading-snug text-[#636363] hover:opacity-75"
                  }
                  to="/profile"
                  onClick={() => setNavbarOpen(!navbarOpen)}
                >
                  <img
                    //TODO: change src to user profile pic
                    src={temp}
                    className="w-11 h-11 rounded-full hidden lg:block"
                    alt="profile"
                  />
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

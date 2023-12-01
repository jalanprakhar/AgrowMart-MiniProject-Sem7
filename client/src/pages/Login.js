import React from "react";
import { useForm } from "react-hook-form";
import login from "../img/login.svg";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { api } from "../api";
import { toast } from "react-toastify";

export default function Login() {

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });
  const onSubmit = (data) => {
    api.login(data.email,data.password).then((res)=>{
      setCookie("AuthToken", res.data.token);
      setCookie("UserId", res.data.userId);
      navigate("/");
    }).catch((e)=>toast.error(e.response.data))
  }

  const handleGoToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="m-auto w-[90%] grid grid-cols-1 md:grid-cols-7 md:gap-20 items-center h-[100%]">
      <div className="col-span-1 md:col-span-4">
        <h1 className="text-xl md:text-3xl font-semibold text-center mb-4">
          Hello, Welcome Back!
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center text-sm md:text-md mt-10 md:mt-16"
        >
          <div className="w-[80%] flex flex-col justify-center">
            <label htmlFor="Email" className="font-semibold text-slate-500">
              Email
            </label>
            <div className="mb-10">
              <input
                type="text"
                className="border-[1.5px] border-slate-400 rounded-md mt-1 px-2 py-3 w-[100%]"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required.</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-red-500">Enter valid Email.</p>
              )}
            </div>
            <label htmlFor="Password" className="font-semibold text-slate-500">
              Password
            </label>
            <div className="mb-10">
              <input
                type="password"
                className="border-[1.5px] border-slate-400 rounded-md mt-1 mb-10 px-2 py-3 w-[100%]"
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">Password must be of length 6.</p>
              )}
            </div>
          </div>
          <input
            type="submit"
            className="cursor-pointer w-[80%] py-3 px-7 text-center text-md font-semibold hover:opacity-75 bg-[#3B8056] text-white rounded-md"
          />
          <p className="mt-3 text-lg">
            New to AgrowMart?{" "}
            <span
              className="cursor-pointer text-[#3B8056] font-bold"
              onClick={handleGoToSignup}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
      <div className="md:col-span-3 hidden md:block">
        <img src={login} alt="signup" className="w-[90%]" />
      </div>
    </div>
  );
}

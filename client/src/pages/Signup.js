import React from "react";
import { useForm } from "react-hook-form";
import signup from "../img/signup.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    first_name: "",
    last_name:"",
    email: "",
    password: "",
    role: "",
    phone_number: "",
  });

  const onSubmit = (data) => {
    console.log(data);
  }

  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="m-auto w-[90%] grid grid-cols-1 md:grid-cols-3 items-center h-[100%]">
      <div className="col-span-1 md:col-span-2">
        <h1 className="text-xl md:text-3xl font-semibold text-center mb-4">
          Get Started with AgrowMart!
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center text-sm md:text-md mt-10 md:mt-16"
        >
          <div className="md:grid md:grid-cols-2 md:gap-10 w-[80%] justify-center">
            <div className="md:col-span-1 flex flex-col">
              <label htmlFor="Name" className="font-semibold text-slate-500">
                First Name
              </label>
              <div className="mb-10">
                <input
                  type="text"
                  className="text-md border-[1.5px] border-slate-400 rounded-md mt-1 px-2 py-3 w-[100%]"
                  placeholder="Name"
                  {...register("first_name", { required: true, maxLength: 100 })}
                />
                {errors.first_name?.type === 'required' && <p className="text-red-500">First name is required.</p>}
              </div>
              <label htmlFor="Name" className="font-semibold text-slate-500">
                Last Name
              </label>
              <div className="mb-10">
              <input
                type="text"
                className="text-md border-[1.5px] border-slate-400 rounded-md mt-1 px-2 py-3 w-[100%]"
                placeholder="Name"
                {...register("last_name", { required: true, maxLength: 100 })}
              />
              {errors.last_name?.type === 'required' && <p className="text-red-500">Last name is required.</p>}
              </div>
              <label
                htmlFor="Phone"
                className="font-semibold text-slate-500"
              >
                Phone No. (+91)
              </label>
              <div className="mb-10">
              <input
                type="phone"
                className="border-[1.5px] border-slate-400 rounded-md mt-1 px-2 py-3 w-[100%]"
                placeholder="Phone No."
                {...register("phone_number", { required: true, minLength: 10, maxLength:10 })}
              />
              {errors.phone_number?.type === 'maxLength' && <p className="text-red-500">Phone number must be of length 10.</p>}
              {errors.phone_number?.type === 'minLength' && <p className="text-red-500">Phone number must be of length 10.</p>}
              </div>
            </div>

            <div className="md:col-span-1 flex flex-col">
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
              {errors.email?.type === 'required' && <p className="text-red-500">Email is required.</p>}
              {errors.email?.type === 'pattern' && <p className="text-red-500">Enter valid Email.</p>}
              </div>
              <label htmlFor="Role" className="font-semibold text-slate-500">
                Role
              </label>
              <div className="mb-10 h-[100%] w-[100%]">
              <div className="mt-1 flex flex-row items-center">
                <input
                  {...register("role", { required: true})}
                  type="radio"
                  value="farmer"
                  className="cursor-pointer w-6 h-6 mr-2"
                />
                <label htmlFor="Farmer">Farmer</label>
                <input
                  {...register("role", { required: true})}
                  type="radio"
                  value="shopper"
                  className="cursor-pointer w-6 h-6 mr-2 ml-6"
                />
                <label htmlFor="Shopper">Shopper</label>
              </div>
              {errors.role?.type === 'required' && <p className="text-red-500">Role is required.</p>}
              </div>

              <label
                htmlFor="Password"
                className="font-semibold text-slate-500"
              >
                Password
              </label>
              <div className="mb-10">
              <input
                type="password"
                className="border-[1.5px] border-slate-400 rounded-md mt-1 px-2 py-3 w-[100%]"
                placeholder="Password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password?.type === 'required' && <p className="text-red-500">Password is required.</p>}
              {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be of length 6.</p>}
              </div>
            </div>
          </div>
          <input
            type="submit"
            className="cursor-pointer w-[80%] py-3 px-7 text-center text-md font-semibold hover:opacity-75 bg-[#3B8056] text-white rounded-md"
          />
          <p className="mt-3 text-lg">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-[#3B8056] font-bold"
              onClick={handleGoToLogin}
            >
              Login
            </span>
          </p>
        </form>
      </div>
      <div className="md:col-span-1 hidden md:block">
        <img src={signup} alt="signup" className="w-[90%]" />
      </div>
    </div>
  );
}

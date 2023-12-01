import React from "react";
import { useForm } from "react-hook-form";

export default function SoilTesting() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        nitrogen: "",
        phosphorous: "",
        pottasium: "",
        cropname: "",
    });
    const onSubmit = (data) => console.log(data);

    return (
        <div className="m-auto w-[80%] items-center h-[100%] mt-[70px]">
            <h1 className="text-lg md:text-2xl font-semibold text-center">
                Get fertilizer recommendation!
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center text-sm md:text-md mt-4 md:mt-8"
            >
                <div className="md:grid md:grid-cols-2 md:gap-10 w-[80%] justify-center">
                    <div className="md:col-span-1 flex flex-col">
                        <label
                            htmlFor="nitrogen"
                            className="font-semibold text-slate-500"
                        >
                            Nitrogen
                        </label>
                        <div className="mb-10">
                            <input
                                type="number"
                                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                                placeholder="Enter the value (Example: 20)"
                                {...register("nitrogen", { required: true, maxLength: 3 })}
                            />
                            {errors.nitrogen?.type === "required" && (
                                <p className="text-red-500">Value of Nitrogen is required!</p>
                            )}
                        </div>
                        <label htmlFor="Phosphorous" className="font-semibold text-slate-500">
                            Phosphorous
                        </label>
                        <div className="mb-10">
                            <input
                                type="number"
                                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                                placeholder="Enter the value (Example: 10)"
                                {...register("phosphorous", { required: true })}
                            />
                            {errors.phosphorous?.type === "required" && (
                                <p className="text-red-500">Value of Phosphorous is required!</p>
                            )}
                        </div>
                        <label htmlFor="Pottasium" className="font-semibold text-slate-500">
                            Pottasium
                        </label>
                        <div className="mb-10">
                            <input
                                type="number"
                                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                                placeholder="Enter the value (Example: 30)"
                                {...register("pottasium", { required: true })}
                            />
                            {errors.pottasium?.type === "required" && (
                                <p className="text-red-500">Value of Pottasium is required!</p>
                            )}
                        </div>
                    </div>

                    <div className="md:col-span-1 flex flex-col">
                        <label htmlFor="cropname" className="font-semibold text-slate-500">
                            Select category
                        </label>
                        <div className="mb-10">
                            <select
                                defaultValue="Select crop"
                                placeholder="Crop you want to grow"
                                {...register("cropname")}
                                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                            >
                                <option disabled hidden>Select crop</option>
                                <option value="rice">Rice</option>
                                <option value="maize">Maize</option>
                                <option value="chickpea">Chickpea</option>
                                <option value="kidneybeans">Kidney Beans</option>
                                <option value="pigeonpeas">Pigeon Peas</option>
                                <option value="mothbeans">Moth Beans</option>
                                <option value="mungbean">Mung Bean</option>
                                <option value="blackgram">Black Gram</option>
                                <option value="lentil">Lentil</option>
                                <option value="pomegranate">Pomegranate</option>
                                <option value="banana">Banana</option>
                                <option value="mango">Mango</option>
                                <option value="grapes">Grapes</option>
                                <option value="watermelon">Watermelon</option>
                                <option value="muskmelon">Muskmelon</option>
                                <option value="apple">Apple</option>
                                <option value="orange">Orange</option>
                                <option value="papaya">Papaya</option>
                                <option value="coconut">Coconut</option>
                                <option value="cotton">Cotton</option>
                                <option value="jute">Jute</option>
                                <option value="coffee">Coffee</option>
                            </select>
                            {errors.cropname?.type === "required" && (
                                <p className="text-red-500">Crop name is required!</p>
                            )}
                        </div>
                    </div>
                </div>
                <input
                    type="submit"
                    className="cursor-pointer w-[80%] py-3 px-7 text-center text-md font-semibold hover:opacity-75 bg-[#3B8056] text-white rounded-md"
                />
            </form>
        </div>
    );
}

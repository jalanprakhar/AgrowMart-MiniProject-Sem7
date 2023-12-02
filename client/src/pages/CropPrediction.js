import React from "react";
import { useState } from "react";
import stateCityData from '../static/Indian_Cities_In_States.json'
import axios from "axios";

export default function CropPrediction() {
    const [formData, setFormData] = useState({
        nitrogen: "",
        phosphorous: "",
        pottasium: "",
        ph: "",
        rainfall: "",
        city: "",
        state: "",
    })

    const [cities, setCities] = useState([]);

    const handleStateChange = (event) => {
        const state = event.target.value;
        setFormData({ ...formData, state: state, city: 'Select City' })
        setCities(stateCityData[state] || []);
    }

    const handleCityChange = (event) => {
        setFormData({ ...formData, city: event.target.value })
    }

    const [result, setResult]=useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("https://ml-models-deployment.onrender.com/crop-predict",formData).then((res)=>{
            setResult(res.data.prediction);
        })
        .catch((e)=>console.log(e))
    };

    return (
        <div className="m-auto w-[80%] items-center h-[100%] mt-[70px]">
            <h1 className="text-lg md:text-2xl font-semibold text-center">
                Find most suitable crop to grow
            </h1>
            <form
                onSubmit={handleSubmit}
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
                                required='true'
                                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                                placeholder="Enter the value (Example: 20)"
                                onChange={(e) => { setFormData({ ...formData, nitrogen: e.target.value }) }}
                            />
                        </div>
                        <label htmlFor="Phosphorous" className="font-semibold text-slate-500">
                            Phosphorous
                        </label>
                        <div className="mb-10">
                            <input
                                type="number"
                                required='true'
                                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                                placeholder="Enter the value (Example: 10)"
                                onChange={(e) => { setFormData({ ...formData, phosphorous: e.target.value }) }}
                            />
                        </div>
                        <label htmlFor="Pottasium" className="font-semibold text-slate-500">
                            Pottasium
                        </label>
                        <div className="mb-10">
                            <input
                                type="number"
                                required='true'
                                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                                placeholder="Enter the value (Example: 30)"
                                onChange={(e) => { setFormData({ ...formData, pottasium: e.target.value }) }}
                            />
                        </div>
                        <label htmlFor="pH" className="font-semibold text-slate-500">
                            pH level
                        </label>
                        <div className="mb-10">
                            <input
                                type="number"
                                required='true'
                                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                                placeholder="Enter the value (Example: 6)"
                                onChange={(e) => { setFormData({ ...formData, ph: e.target.value }) }}
                            />
                        </div>
                        
                    </div>

                    <div className="md:col-span-1 flex flex-col">
                    <label htmlFor="Rainfall" className="font-semibold text-slate-500">
                            Rainfall (in mm)
                        </label>
                        <div className="mb-10">
                            <input
                                type="number"
                                required='true'
                                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                                placeholder="Enter the value (Example: 5)"
                                onChange={(e) => { setFormData({ ...formData, rainfall: e.target.value }) }}
                            />
                        </div>
                        <label htmlFor="State" className="font-semibold text-slate-500">
                            State
                        </label>
                        <div className="mb-10">
                            <select
                                defaultValue="Select State"
                                required='true'
                                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                                onChange={handleStateChange}
                            >
                                <option disabled hidden>Select State</option>
                                {Object.keys(stateCityData).map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <label htmlFor="city" className="font-semibold text-slate-500">
                            City
                        </label>
                        <div className="mb-10">
                            <select
                                defaultValue="Select City"
                                value={formData.city}
                                required='true'
                                className="border-[1.5px] border-slate-400 rounded-md mt-1 w-[100%] px-2 py-3"
                                disabled={!cities}
                                onChange={handleCityChange}
                            >
                                <option value=''>Select City</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <input
                    type="submit"
                    className="cursor-pointer w-[80%] py-3 px-7 text-center text-md font-semibold hover:opacity-75 bg-[#3B8056] text-white rounded-md"
                />
            </form>
            <p className="text-center text-lg">{result}</p>
        </div>
    );
};
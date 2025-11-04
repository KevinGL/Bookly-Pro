"use client"

import { useEffect, useState } from "react";
import Navbar from "../components/navbars";
import MiddlewareLogin from "../security/middlewareLogin";
import { getAllServices, getServicesByCatId, getServicesByCatName } from "../actions/services";
import { getAllCategories } from "../actions/categories";

export default function Booking()
{
    const [categories, setCategories] = useState([]);
    const [catSelected, setCatSelected] = useState<string>("Photographe professionnel");
    const [services, setServices] = useState(new Map());

    useEffect(() =>
    {
        const getCategories = async () =>
        {
            setCategories(await getAllCategories());
        }
        getCategories();

        const getServices = async () =>
        {
            setServices(await getAllServices());
        }
        getServices();
    }, []);
    
    MiddlewareLogin();

    const handleSetCat = async (cat: any) =>
    {
        //console.log(catId);
        setCatSelected(cat.name);
    }

    return (
        <>
            <Navbar />
            
            <div>
                <h1 className="my-3">BOOKLY PRO</h1>
                <input type="text" placeholder="Trouver des services" className="mb-3" />

                <div className="flex justify-between items-center bg-gray-100 w-[770px] h-[50px] rounded-lg mb-3">
                    {
                        categories.map((cat: any, index: number) =>
                        {
                            return (
                                <button key={index} className={`rounded-md px-2 h-3/4 ${cat.name === catSelected ? "bg-white text-indigo-700 text-bold border-1 border-gray-200" : ""} hover:cursor-pointer`} onClick={() => handleSetCat(cat)}>{cat.name}</button>
                            )
                        })
                    }
                </div>

                {
                    services.get(catSelected) &&
                    
                    <div className="rounded-md border-1 border-gray-300 w-[400px]">
                        {
                            services.get(catSelected).map((service: any, index: number) =>
                            {
                                return (
                                    <div key={index} className={`${index < services.get(catSelected).length - 1 ? "border-b-1" : ""} border-gray-300 w-9/10 mx-auto my-5`}>
                                        <h1 className="text-xl">{service.title}</h1>
                                        <div className="flex justify-between">
                                            <h1 className="text-lg text-gray-600">{service.duration} min</h1>
                                            <h1 className="text-lg text-gray-600">{service.price} €</h1>
                                        </div>
                                        <p className="text-lg text-gray-600 mb-2">{service.description}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </>
    )
}
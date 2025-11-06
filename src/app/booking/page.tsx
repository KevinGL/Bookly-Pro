"use client"

import { useEffect, useState } from "react";
import Navbar from "../components/navbars";
import MiddlewareLogin from "../security/middlewareLogin";
import { getAllServices, getServicesByCatId, getServicesByCatName } from "../actions/services";
import { getAllCategories } from "../actions/categories";

export default function Booking()
{
    const [categories, setCategories] = useState<any>([]);
    const [catSelected, setCatSelected] = useState<string>("Photographe professionnel");
    const [lastCatSelected, setLastCatSelected] = useState<string>("Photographe professionnel");
    const [services, setServices] = useState(new Map());
    const [servicesSearch, setServicesSearch] = useState<any[]>([]);

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
        setLastCatSelected(cat.name);
    }

    const handleSearch = (input: string) =>
    {
        if(input !== "")
        {
            //console.log(input);
            const servicesArray: any[] = [];

            services.forEach((service) =>
            {
                service.map((item: any) =>
                {
                    servicesArray.push(item);
                });
            });

            setCatSelected("");

            const res = servicesArray.filter((item) => item.title.toLowerCase().indexOf(input.toLowerCase()) > -1 || item.description.toLowerCase().indexOf(input.toLowerCase()) > -1);
            //console.log(res);

            setServicesSearch(res);
        }

        else
        {
            setCatSelected(lastCatSelected);
        }
    }

    return (
        <>
            <Navbar />
            
            <div>
                <h1 className="mt-3 mb-6 text-4xl text-bold">BOOKLY PRO</h1>
                <input type="text" placeholder="Trouver des services ..." className="rounded-lg border-1 border-gray-300 w-[400px] h-[50px] mb-6" onChange={(e) => handleSearch(e.target.value)} />

                <div className="flex justify-between items-center bg-gray-100 w-[770px] h-[50px] rounded-lg mb-6">
                    {
                        categories.map((cat: any, index: number) =>
                        {
                            return (
                                <button key={index} className={`rounded-lg px-2 h-9/10 ${cat.name === catSelected ? "bg-white text-indigo-700 text-bold border-1 border-gray-200" : ""} hover:cursor-pointer`} onClick={() => handleSetCat(cat)}>{cat.name}</button>
                            )
                        })
                    }
                </div>

                {
                    services.get(catSelected) &&
                    
                    <div className="rounded-lg border-1 border-gray-300 w-[400px]">
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

                {
                    !services.get(catSelected) &&
                    
                    <div className="rounded-lg border-1 border-gray-300 w-[400px]">
                        {
                            servicesSearch.map((service: any, index: number) =>
                            {
                                return (
                                    <div key={index} className={`${index < servicesSearch.length - 1 ? "border-b-1" : ""} border-gray-300 w-9/10 mx-auto my-5`}>
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
"use client"

import { useEffect, useState } from "react";
import Navbar from "../components/navbars";
import MiddlewareLogin from "../security/middlewareLogin";
import { getAllServices, getServicesByCat } from "../actions/services";
import { getAllCategories } from "../actions/categories";

export default function Booking()
{
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() =>
    {
        const getCategories = async () =>
        {
            setCategories(await getAllCategories());
        }

        getCategories();
    }, []);
    
    MiddlewareLogin();

    const handleSetCat = async (catId: number) =>
    {
        //console.log(catId);

        setServices(await getServicesByCat(catId));
    }

    return (
        <>
            <Navbar />
            
            <div className="flex flex-wrap justify-around">
                {
                    categories.map((cat: any, index: number) =>
                    {
                        const images =
                        [
                            {
                                src: "/img/Studio photographer-cuate.png",
                                alt: "Photo"
                            },

                            {
                                src: "/img/Beauty salon-rafiki.png",
                                alt: "Beauty"
                            },

                            {
                                src: "/img/Pleasant surprise-amico.png",
                                alt: "Wellness"
                            }
                        ];
                        
                        return (
                            <div key={cat.id} className="w-[450px] border-2 rounded-2xl border-solid my-5 mx-5 hover:cursor-pointer hover:scale-105 duration-500 bg-white" onClick={() => handleSetCat(cat.id)}>
                                <div className="text-center mt-5">{cat.name}</div>
                                <img src={images[index].src} alt={images[index].alt} />
                            </div>
                        )
                    })
                }
            </div>

            {
                services.length > 0 &&

                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="border">Titre</th>
                            <th className="border">Durée</th>
                            <th className="border">Tarif</th>
                            <th className="border">Description</th>
                            <th className="border">Proposé par</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                            services.map((service: any) =>
                            {
                                const hours: number = Math.floor(service.duration / 60);
                                const minutes: number = service.duration % 60;
                                
                                return (
                                    <tr key={service.id}>
                                        <td className="border">{service.title}</td>
                                        <td className="border">{hours}h{minutes > 0 ? minutes : ""}</td>
                                        <td className="border">{service.price} €</td>
                                        <td className="border">{service.description}</td>
                                        <td className="border">{service.user.firstname} {service.user.lastname}</td>
                                        <td className="border"><button>Réserver</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
        </>
    )
}
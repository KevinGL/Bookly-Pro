"use client"

import Navbar from "../components/navbars";
import MiddlewareLogin from "../security/middlewareLogin";

export default function Booking()
{
    MiddlewareLogin();

    return (
        <>
            <Navbar />
            
            BOOKING
        </>
    )
}
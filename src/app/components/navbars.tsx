"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar()
{
    const router = useRouter();
    
    const handleSignout = async() =>
    {
        await signOut();

        router.push("/login");
    }

    return (
        <nav>
            <button onClick={handleSignout}>Déconnexion</button>
        </nav>
    )
}
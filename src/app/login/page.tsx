"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MiddlewareLogout from "../security/middlewareLogout";

export default function login()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    MiddlewareLogout();

    const handleSubmit = async () =>
    {
        const result = await signIn("credentials",
        {
            redirect: false,
            email,
            password
        });

        if (result?.error)
        {
            setError("Email ou mot de passe incorrect.");
        }
        else
        {
            router.push("/booking");
        }
    };

    return (
        <>
            <div>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleSubmit}>Connexion</button>
            </div>

            {
                error !== "" &&

                <div>
                    {error}
                </div>
            }
        </>
    )
}
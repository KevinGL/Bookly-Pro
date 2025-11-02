"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MiddlewareLogin()
{
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() =>
    {
        if (status === "loading") return;

        if (status === "unauthenticated")
        {
            router.push("/login")
        }
    }, [status, router]);
}
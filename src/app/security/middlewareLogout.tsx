"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MiddlewareLogout()
{
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() =>
    {
        if (status === "unauthenticated") return;

        if (status === "authenticated")
        {
            router.push("/booking")
        }
    }, [status, router]);
}
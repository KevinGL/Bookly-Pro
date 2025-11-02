"use client"

import { useRouter } from "next/navigation";

export default function Home()
{
  const router = useRouter();
  
  return (
    <>
      <button onClick={() => router.push("/login")}>Connexion</button>
      <button onClick={() => router.push("/signup")}>Inscription</button>
    </>
  );
}

"use client";
import { useSession } from "next-auth/react";
import Homepage from "@/components/homelogin";
import HomeComponent from "@/components/home";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return session ? <Homepage /> : <HomeComponent />;
}
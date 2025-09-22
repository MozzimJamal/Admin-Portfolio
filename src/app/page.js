"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectList from "./pages/Projects";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // not logged in → redirect
    } else {
      setLoading(false); // logged in → show content
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  return <ProjectList />;
}

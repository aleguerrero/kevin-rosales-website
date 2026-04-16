"use client";
import { useEffect, useState } from "react";

export default function FadeInMount({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    document.body.classList.remove("leaving");
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div className={`transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}>
      {children}
    </div>
  );
}

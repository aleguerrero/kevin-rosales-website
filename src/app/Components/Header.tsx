"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Projects from "./Projects";
import { usePathname } from "next/navigation";
import path from "path";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [onVideo, setOnVideo] = useState(false);
  const [onSA, setOnSA] = useState(false);
  const route = pathname.split("/")[1];

  // Close the menu on any navigation
  useEffect(() => {
    if (route ===  "projects") {
      setOnVideo(true);
    }

    if (route === "about" || route === "stills" ) {
      setOnSA(true);
    }
  }, [pathname]);

  console.log(pathname)

  return (
    <header
      className={`fixed w-full top-0 left-0 right-0 z-50 p-8 fade-in-container`}
    >
      <div className="">
        <nav className="flex items-center gap-6">
          <div className="w-1/2 flex">
            {onVideo || onSA ? (
              <Link href={"/"} onClick={() => {
                setOnVideo(false)
                setOnSA(false)
              }}>
                home.
              </Link>
            ) : (
              <button
                className="cursor-pointer"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="projects-menu"
              >
                projects.
              </button>
            )}

            <Link href="/about" className="ml-4 cursor-pointer" onClick={() => setOnSA(true)}>
              about.
            </Link>
          </div>
          <div className="flex w-1/2 justify-end">
            <Link href="/stills" className="cursor-pointer" onClick={() => setOnSA(true)}>
              stills.
            </Link>
          </div>
        </nav>
      </div>

      {open && !onVideo && !onSA && (
        <div id="projects-menu" className="pt-4" >
          <div className="">
            <Projects />
          </div>
        </div>
      )}
    </header>
  );
}

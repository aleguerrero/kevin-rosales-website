"use client";

import { useEffect, useState } from "react";

export default function PreviewLayer() {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const onHover = (e: Event) => {
      const ce = e as CustomEvent<string | null>;
      setSlug(ce.detail ?? null);
    };
    window.addEventListener("project-hover", onHover as EventListener);
    return () => window.removeEventListener("project-hover", onHover as EventListener);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-300 ${
        slug ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden
    >
      {slug && (
        <>
          <video
            key={slug}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={`/previews/${slug}.mp4`} type="video/mp4" />
          </video>
          {/* optional: a subtle veil for readability over bright footage */}
          <div className="absolute inset-0" />
        </>
      )}
    </div>
  );
}

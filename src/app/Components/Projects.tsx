"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Project = { name: string; slug: string };

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/projects.json", { cache: "no-store" })
      .then(r => r.json())
      .then(d => setProjects(d.projects ?? []))
      .catch(() => setProjects([]));
  }, []);

  const fireHover = (slug: string | null) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("project-hover", { detail: slug }));
      document.body.classList.toggle("preview-active", Boolean(slug)); // flip text → white
    }
  };

  return (
    <ul className="w-fit space-y-2">
      {projects.map(p => (
        <li key={p.slug} className="w-fit">
          <Link
            href={`/projects/${p.slug}`}
            className="inline-block transition-colors duration-200"
            onMouseEnter={() => fireHover(p.slug)}
            onMouseLeave={() => fireHover(null)}
            // onFocus={() => fireHover(p.slug)}
            // onBlur={() => fireHover(null)}
            onClick={() => fireHover(null)}
          >
            {p.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

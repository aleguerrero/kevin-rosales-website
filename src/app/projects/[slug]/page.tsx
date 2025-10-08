// src/app/projects/[slug]/page.tsx
import FadeInMount from "@/app/Components/FadeInMount";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

type Project = { name: string; slug: string; vimeoId: string };

async function getProjects(): Promise<Project[]> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const url = `${proto}://${host}/projects.json`;
  const res = await fetch(url, { cache: "force-cache" });
  const data = await res.json();
  return (data.projects ?? []) as Project[];
}

export default async function ProjectPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <FadeInMount>
      {/* Full-viewport video behind header */}
      <div className="fixed inset-0 z-0 bg-black">
        <iframe
          src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&muted=1&playsinline=1&title=0&byline=0&portrait=0`}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={project.name}
        />
      </div>
      {/* spacer for fixed header height */}
      <div className="h-16" />
    </FadeInMount>
  );
}

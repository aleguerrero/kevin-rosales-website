// src/app/projects/[slug]/page.tsx
import FadeInMount from "@/app/Components/FadeInMount";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import generateMetadata from "next";
import localFont from "next/font/local";

const canelaFont = localFont({
  src: "/../../../../public/Canela-Thin.otf",
});

const overusedFont = localFont({
  src: "/../../../../public/OverusedGrotesk-SemiBold.otf",
});

export type ProjectCredit = {
  role: string;
  name: string;
};

export type Project = {
  name: string;
  slug: string;
  vimeoId: string;
  production: string;
  credits: ProjectCredit[];
};

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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = (await getProjects()).find((p) => p.slug === slug);
  if (!project) return notFound();

  const creditsArray = Object.entries(project.credits).map(([role, name]) => ({
    role,
    name,
  }));

  return (
    <FadeInMount>
      {/* Full-viewport video behind header */}
      <div className="flex flex-col inset-0 z-0 bg-white h-[150dvh] w-full">
        <div className="h-[100dvh] w-full flex justify-center items-center">
          <iframe
            src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&muted=1&playsinline=1&title=0&byline=0&portrait=0`}
            className="w-[90%] h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={project.name}
          />
        </div>
        <div className="h-[50dvh] w-full flex flex-col items-center justify-center overflow-scroll">
          <div className={`${canelaFont.className} pb-16`}>a <span className={`${overusedFont.className} font-bold uppercase leading-none text-xl`}>{project.production}</span> production</div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {project.credits.map((credit) => (
              <div
                key={`${credit.role}-${credit.name}`}
                className="inline-flex items-baseline whitespace-nowrap"
              >
                <span className={`${canelaFont.className} mr-1 lowercase leading-none`}>
                  {credit.role}
                </span>
                <span
                  className={`${overusedFont.className} font-bold uppercase leading-none text-xl`}
                >
                  {credit.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeInMount>
  );
}

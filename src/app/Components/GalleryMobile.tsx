"use client";

import { useEffect, useMemo, useRef } from "react";

type Project = {
  title: string;
  src: string;
  x: number;
  y: number;
  z: number;
  horizontal: boolean;
};

type ProjectsProps = {
  projects: Project[];
};

// Project/brand a video belongs to, derived from its title
// (e.g. "BONAQUA_MANIFESTO_..." -> "BONAQUA", "COCACOLATOKYO03" -> "COCACOLATOKYO").
const projectKey = (title: string) =>
  title
    .toUpperCase()
    .replace(/^UBER-EATS/, "UE")
    .split(/[_\s\d.-]/)[0];

// Deterministic mix (no hydration mismatch): each project's videos are spread evenly
// across the whole feed, keeping their original order, and two videos of the same
// project are never placed back to back when it can be avoided.
function interleaveByProject(items: Project[]): Project[] {
  const groups = new Map<string, Project[]>();
  items.forEach((p) => {
    const key = projectKey(p.title);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(p);
  });

  // Ideal relative position (0..1) of every video within the feed.
  const slots: { key: string; pos: number; group: number; p: Project }[] = [];
  [...groups.entries()].forEach(([key, list], group) => {
    list.forEach((p, j) =>
      slots.push({ key, pos: (j + 0.5) / list.length, group, p })
    );
  });
  slots.sort((a, b) => a.pos - b.pos || a.group - b.group);

  // Walk the ideal order, skipping ahead when the next one repeats the previous project.
  const result: Project[] = [];
  let lastKey = "";
  while (slots.length) {
    let i = slots.findIndex((s) => s.key !== lastKey);
    if (i === -1) i = 0;
    const [s] = slots.splice(i, 1);
    result.push(s.p);
    lastKey = s.key;
  }
  return result;
}

export default function GalleryMobile({ projects }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const verticals = useMemo(
    () => interleaveByProject(projects.filter((p) => !p.horizontal)),
    [projects]
  );

  // Play only the video that is snapped into view; pause and reset the rest.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let current = -1;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const sync = () => {
      const index = Math.round(root.scrollTop / root.clientHeight);
      if (index === current) return;
      current = index;
      videoRefs.current.forEach((video, i) => {
        if (!video) return;
        if (i === index) {
          video.play().catch(() => {});
        } else if (!video.paused || video.currentTime > 0) {
          video.pause();
          video.currentTime = 0;
        }
      });
    };

    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(sync, 80);
    };

    sync();
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      root.removeEventListener("scroll", onScroll);
    };
  }, [verticals.length]);

  return (
    <div
      ref={containerRef}
      className="h-dvh w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory overscroll-contain no-scrollbar"
    >
      {verticals.map((p, i) => (
        <section
          key={p.src}
          className="relative h-dvh w-full snap-start snap-always flex items-center justify-center"
        >
          <video
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={p.src}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="metadata"
          />
        </section>
      ))}
    </div>
  );
}

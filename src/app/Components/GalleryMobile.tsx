"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

// First-frame image generated with ffmpeg into /public/smw/posters.
const posterFor = (src: string) =>
  src.replace(/^\/smw\/(Featured|rest)\//, "/smw/posters/").replace(/\.webm$/, ".webp");

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
  const [activeIndex, setActiveIndex] = useState(0);

  // Play only the video closest to the center of the screen; pause the rest.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let current = -1;
    let frame = 0;

    const sync = () => {
      frame = 0;
      const center = root.clientHeight / 2;
      let index = 0;
      let best = Infinity;
      videoRefs.current.forEach((video, i) => {
        if (!video) return;
        const r = video.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - center);
        if (d < best) {
          best = d;
          index = i;
        }
      });
      if (index === current) return;
      current = index;
      setActiveIndex(index);
      videoRefs.current.forEach((video, i) => {
        if (!video) return;
        if (i === index) {
          video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    sync();
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("scroll", onScroll);
    };
  }, [verticals.length]);

  return (
    <div
      ref={containerRef}
      className="h-dvh w-full overflow-y-auto overflow-x-hidden no-scrollbar pt-24 pb-8 flex flex-col gap-4"
    >
      {verticals.map((p, i) => (
        <video
          key={p.src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={p.src}
          poster={posterFor(p.src)}
          className="w-full aspect-[9/16] shrink-0 object-cover bg-neutral-900"
          muted
          loop
          playsInline
          disablePictureInPicture
          // Buffer the current video and the next couple; skip the rest so
          // they don't compete for bandwidth (the poster shows meanwhile).
          preload={i >= activeIndex - 1 && i <= activeIndex + 2 ? "auto" : "none"}
        />
      ))}
    </div>
  );
}

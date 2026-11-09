"use client";

import { useState, useRef, useEffect, useMemo } from "react";

type Project = {
  title: string;
  src: string;
  x: number;
  y: number;
  z: number;
  w?: number;
  horizontal?: boolean;
};

type ProjectsProps = {
  projects: Project[];
  size?: number;
};

// width of each video as % of the container; y is also in % of container width
// so the layout keeps its proportions on any screen size
const ITEM_WIDTH_PCT = 26;

// Columns of the hand-made layout in smw.json (x ≈ 0, 24, 48, 73).
const BASE_COLUMNS = 4;
// Container width (px) -> number of columns. The 4-column layout is the original one.
const columnsFor = (width: number) => (width >= 1280 ? 4 : width >= 1024 ? 3 : 2);
// How much each video overlaps the one above it in the generated layouts (like the original collage).
const VERTICAL_OVERLAP = 0.85;
// Videos grow when there are fewer columns, a bit less than the column does so they don't spill out.
const WIDTH_FACTOR = 0.82;

type Placed = Project & { w: number };

// Re-packs the collage into fewer columns (masonry), keeping each video's original
// order, its small horizontal offset inside its column, and its relative size.
function relayout(projects: Project[], columns: number, size: number): Placed[] {
  if (columns >= BASE_COLUMNS) return projects.map((p) => ({ ...p, w: p.w ?? size }));

  const colPct = 100 / BASE_COLUMNS;
  const scale = BASE_COLUMNS / columns;
  const bottoms = new Array(columns).fill(0);

  // Reading order of the original layout: top to bottom, then left to right.
  const order = projects
    .map((p, i) => ({ p, i }))
    .sort((a, b) => a.p.y - b.p.y || a.p.x - b.p.x);

  const placed: Placed[] = new Array(projects.length);
  order.forEach(({ p, i }) => {
    const col = bottoms.indexOf(Math.min(...bottoms));
    const origCol = Math.min(BASE_COLUMNS - 1, Math.max(0, Math.round(p.x / colPct)));
    const jitter = (p.x - origCol * colPct) * scale;
    const w = (p.w ?? size) * scale * WIDTH_FACTOR;
    // y and heights are in % of the container width.
    const height = p.horizontal ? (w * 9) / 16 : (w * 16) / 9;

    const x = Math.min(Math.max(col * (100 / columns) + jitter, -2), 102 - w);

    placed[i] = { ...p, x, y: bottoms[col], w };
    bottoms[col] += height * VERTICAL_OVERLAP;
  });
  return placed;
}

const Gallery = ({ projects, size = ITEM_WIDTH_PCT }: ProjectsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [zIndexes, setZIndexes] = useState<number[]>(() =>
    projects.map((p) => p.z),
  );
  const [maxZ, setMaxZ] = useState(() =>
    Math.max(0, ...projects.map((p) => p.z)),
  );
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const columns = columnsFor(containerWidth);
  const layout = useMemo(
    () => relayout(projects, columns, size),
    [projects, columns, size],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function updateSize(w: number) {
      setContainerWidth(w);
    }

    const { width } = container.getBoundingClientRect();
    if (width > 0) updateSize(width);

    const observer = new ResizeObserver((entries) => {
      const { width: w } = entries[0].contentRect;
      if (w > 0) updateSize(w);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * -0.15;
      const y = (e.clientY - window.innerHeight / 2) * -0.05;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const bringToFront = (index: number) => {
    setMaxZ((prev) => {
      const next = prev + 1;
      setZIndexes((z) => z.map((v, i) => (i === index ? next : v)));
      return next;
    });
  };

  // const handleMouseEnter = (
  //   e: React.MouseEvent<HTMLDivElement>,
  //   index: number,
  // ) => {
  //   bringToFront(index);
  //   const video = e.currentTarget.querySelector("video");
  //   video?.play().catch(() => {});
  // };

  // const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const video = e.currentTarget.querySelector("video");
  //   if (video) {
  //     video.pause();
  //     video.currentTime = 0;
  //   }
  // };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full flex justify-center items-center overflow-y-auto overflow-x-hidden no-scrollbar"
    >
      {layout.map((item, i) => {
        const style: React.CSSProperties = {
          width: `${item.w}%`,
          top: (item.y / 100) * containerWidth,
          left: `${item.x}%`,
          zIndex: zIndexes[i] ?? item.z,
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        };

        return (
          <div
            key={i}
            className="absolute group cursor-pointer transition-transform duration-300 ease-out"
            onMouseEnter={() => bringToFront(i)}
            style={style}
          >
            <video
              src={item.src}
              className="w-full h-full object-contain brightness-[50%] group-hover:brightness-[100%]"
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              preload="metadata"
            />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;

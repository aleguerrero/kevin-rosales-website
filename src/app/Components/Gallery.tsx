"use client";

import { useState, useRef, useEffect } from "react";

type Project = {
  title: string;
  src: string;
  x: number;
  y: number;
  z: number;
  w?: number;
};

type ProjectsProps = {
  projects: Project[];
  size?: number;
};

// width of each video as % of the container; y is also in % of container width
// so the layout keeps its proportions on any screen size
const ITEM_WIDTH_PCT = 26;

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
      {projects.map((item, i) => {
        const style: React.CSSProperties = {
          width: `${item.w ?? size}%`,
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

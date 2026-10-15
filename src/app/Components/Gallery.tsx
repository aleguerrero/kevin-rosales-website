"use client";

import { useState, useRef, useEffect } from "react";

type Project = {
  title: string;
  src: string;
  x: number;
  y: number;
  z: number;
};

type ProjectsProps = {
  projects: Project[];
  size?: number;
};

const IMG_PX = 300;

const Gallery = ({ projects, size = IMG_PX }: ProjectsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgpx, setImgpx] = useState(500);
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

    function updateSize(containerWidth: number) {
      setImgpx(Math.min(1000, containerWidth * 0.5));
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
          width: size,
          top: `${item.y}%`,
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
            <div
              id={item.title}
              className="absolute inset-0 flex flex-col items-center text-sm justify-center text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            >
              {item.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;

"use client";

import { useRef, useState } from "react";

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

export default function GalleryMobile({ projects }: ProjectsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleTap = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
        video.currentTime = 0;
      }
    });

    const video = videoRefs.current[index];
    if (!video) return;

    if (activeIndex === index && !video.paused) {
      video.pause();
      setActiveIndex(null);
    } else {
      video.play().catch(() => {});
      setActiveIndex(index);
    }
  };

  return (
    <div className="pt-24 h-full w-full flex flex-col overflow-y-auto overflow-x-hidden no-scrollbar max-md:grid max-md:grid-cols-2 max-md:gap-4">
      {projects.map((p, i) => (
        <div
          key={i}
          onClick={() => handleTap(i)}
          className={`cursor-pointer transition-transform duration-300 ease-out ${p.horizontal && "max-md:col-span-2"}`}
        >
          <video
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={p.src}
            className={`w-full h-full object-contain transition-[filter] duration-300 ${activeIndex === i ? "brightness-100" : "brightness-[50%]"}`}
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="metadata"
          />
          <div
            id={p.title}
            className="absolute inset-0 flex flex-col items-center text-sm justify-center text-center p-2 opacity-0 active:opacity-100 transition-opacity pointer-events-none"
          >
            {p.title}
          </div>
        </div>
      ))}
    </div>
  );
}

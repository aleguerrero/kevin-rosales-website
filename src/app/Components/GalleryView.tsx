"use client";
import GalleryMobile from "../Components/GalleryMobile";
import Gallery from "../Components/Gallery";
import { useWindowSize } from "../hooks/useWindowsSize";

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

export default function GalleryView({ projects }: ProjectsProps) {
  const { width } = useWindowSize();

  return (
    <div className=" w-full h-dvh flex flex-row items-center justify-center fade-in-container">
      <div className="w-full h-full flex flex-row justify-center items-center">
        {width >= 768 ? (
          <Gallery projects={projects} />
        ) : (
          <GalleryMobile projects={projects} />
        )}
      </div>
    </div>
  );
}

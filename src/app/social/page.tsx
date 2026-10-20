import fs from "fs";
import path from "path";
import { Metadata } from "next";
import GalleryView from "../Components/GalleryView";

export type Project = {
  title: string;
  src: string;
  x: number;
  y: number;
  z: number;
  horizontal: boolean;
};

export const metadata: Metadata = {
  title: "Social Media Work",
};

async function getProjects(): Promise<Project[]> {
  const filePath = path.join(process.cwd(), "public", "smw.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  return (data.projects ?? []) as Project[];
}

export default async function SMW() {
  const projects = await getProjects();
  return (
    <GalleryView projects={projects} />
  );
}

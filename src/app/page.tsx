import PreviewLayer from "./Components/PreviewLayer";
import localFont from "next/font/local";

export const metadata = {
  title: "Kevin Rosales",
};

export default function Home() {
  return (
    <>
      <PreviewLayer />
      <div className="fixed inset-0 z-[2] pt-16 grid grid-cols-1 md:grid-cols-2 h-dvh pointer-events-none fade-in-container">
        <div className="max-md:w-1/2 w-1/3 flex flex-row max-md:items-end max-md:mb-8">
          <div className="pl-8 w-1/2 flex items-center justify-start text-xl">
            <p>Kevin</p>
          </div>
          <div className="w-1/2 flex items-center justify-start text-xl">
            <p>Rosales</p>
          </div>
        </div>
      </div>
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={`/REEL_web.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <section className="home-section h-dvh" />
      </div>
    </>
  );
}
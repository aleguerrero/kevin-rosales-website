import PreviewLayer from "./Components/PreviewLayer";
import localFont from "next/font/local";

export const metadata = {
  title: "Kevin Rosales",
};

export default function Home() {
  return (
    <>
      <PreviewLayer />
      <div
        className="video-background"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src={`/REEL_web.mp4`} type="video/mp4" />
        </video>
        <section className="home-section pt-16 z-10 relative grid grid-cols-1 md:grid-cols-2 h-dvh fade-in-container">
          <div className="max-md:w-1/2 w-1/3 flex flex-row max-md:items-end max-md:mb-8">
            <div className="pl-8 w-1/2 flex items-center justify-start text-xl">
              <p>Kevin</p>
            </div>
            <div className="w-1/2 flex items-center justify-start text-xl">
              <p>Rosales</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

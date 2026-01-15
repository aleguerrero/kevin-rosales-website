import PreviewLayer from "./Components/PreviewLayer";
import localFont from "next/font/local";

const mainFont = localFont({
  src: '/../../public/OverusedGrotesk-VF.woff2'
})

export const metadata = {
    title: 'Kevin Rosales',
  };

export default function Home() {
  return (
    <div className={mainFont.className}>
      <PreviewLayer />
      <section className="home-section pt-16 z-10 relative grid grid-cols-1 md:grid-cols-2 h-[100dvh]">
        <div className="flex items-center justify-center"><p>KEVIN</p></div>
        <div className="flex items-center justify-center"><p>ROSALES</p></div>
      </section>
    </div>
  );
}

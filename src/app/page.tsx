import PreviewLayer from "./Components/PreviewLayer";
import localFont from "next/font/local";

const mainFont = localFont({
  src: '/../../public/OverusedGrotesk-VF.woff2'
})

export default function Home() {
  return (
    <div className={mainFont.className}>
      <PreviewLayer />
      <section className="home-section z-10 relative grid grid-cols-1 md:grid-cols-2 min-h-[calc(100dvh-4rem)]">
        <div className="flex items-center justify-center"><p>Kevin</p></div>
        <div className="flex items-center justify-center"><p>Rosales</p></div>
      </section>
    </div>
  );
}

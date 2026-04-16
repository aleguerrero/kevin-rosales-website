export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="p-8 flex flex-row max-md:flex-col w-full pt-24 fade-in-container">
      <div className="max-md:w-full w-1/4 flex flex-col font-thin text-lg">
        <div className="mb-8">
          From Guatemala now based in Mexico City, Kevin creates at the crossing
          of documentary narratives and advertisement, elevating storytelling
          through emotion and closeness in his work.
        </div>
        <div className="mb-8">
          With an unfinished career in graphic design, then working as an editor
          and animator, Kevin has learned the craft of filmmaking through a
          practice in writing, listening, shooting and collaborating with many
          creatives and amazing people around the world.
        </div>
        <div className="mb-8">—</div>
        <div className="mb-8">
          Let’s talk about life at{" "}
          <span className="font-medium"><a href="mailto:hello@kevrosales.com">hello@kevrosales.com</a></span> or get in
          touch with:
        </div>
        <div>Representation | <a href="https://www.landia.com/" target="_blank"rel="noopener noreferrer" className="underline-hover cursor-pointer">Landia</a></div>
        <div className="flex flex-row pt-4 ">
          <a
            href="https://www.instagram.com/kevrosales_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={`/instagramlogo.png`} className="w-[20px] mr-[10px]" />
          </a>
          <a
            href="https://vimeo.com/kevrosales"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={`/vimeologo.png`} className="w-[20px]" />
          </a>
        </div>

      </div>
    </div>
  );
}

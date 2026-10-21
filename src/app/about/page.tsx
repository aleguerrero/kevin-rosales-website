import Awards from "../Components/Awards";
import awards from "./awards.json";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="p-8 flex flex-row max-md:flex-col w-full items-center justify-center pt-24 fade-in-container">
      <div className="md:w-3/4">
        <div className="max-md:w-full w-1/2 flex flex-col font-thin text-lg">
          <div className="mb-8">
            Kevin Rosales is a Guatemalan director based in Mexico City who goes
            looking for the real story inside every idea. He came to directing
            through graphic design, animation and editing, which gave him an eye
            for image and rhythm. That background shaped his documentary
            approach: casting real people, listening first, and letting the
            story reveal itself.
          </div>
          <div className="mb-8">
            His films are drawn to people on the edge of a change: goodbyes,
            crossings and the in-between, where emotion surfaces little by
            little instead of being explained.
          </div>
          <div className="mb-8">
            Rosales directed Cerveza Indio’s Pay It Forward (Ogilvy),
            shortlisted at Cannes Lions, with a Bronze at El Ojo de
            Iberoamérica and a Merit at The One Show, and Embasa’s Line Guide
            (DDB), a Cannes Lions shortlist and El Ojo Bronze winner. He
            co-directed Cerveza Indio’s The Mexican Dream alongside Nono Ayuso,
            also leading its B-unit (Bronze Lion in Film, 2026), and directed
            the B-unit for Ariel Danziger on Tecate’s Welcome back, paisano
            (Gold Lion, 2026).
          </div>
          <div className="mb-8">
            His work spans Heineken, Grupo Modelo, Ford, BBVA and Apple, in
            Spanish and English, with agencies including Wieden+Kennedy, Ogilvy,
            TBWA and DDB.
          </div>
          <div className="mb-8">
            He is now finishing his first narrative short film, headed to
            festivals.
          </div>
          <div className="mb-8">—</div>
          <div className="mb-8">
            Let’s talk about life at{" "}
            <span className="font-medium">
              <a href="mailto:hello@kevrosales.com">hello@kevrosales.com</a>
            </span>
          </div>
          <div className="mb-8">—</div>
          <div className="font-bold">
            Selected Awards
          </div>
          <div className="pt-4">
            <Awards awards={awards} />
          </div>
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
    </div>
  );
}

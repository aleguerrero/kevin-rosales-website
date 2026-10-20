export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="p-8 flex flex-row max-md:flex-col w-full items-center justify-center pt-24 fade-in-container">
      <div className="md:w-3/4">
        <div className="max-md:w-full w-1/3 flex flex-col font-thin text-lg">
          <div className="mb-8">
            Born in Guatemala and based in Mexico City, Kevin Rosales came to
            directing through graphic design, animation and editing, years spent
            learning how images move people before he ever called action. That
            path shaped his documentary approach to storytelling: casting real
            people, listening first, and finding the true story hidden inside
            every idea.
          </div>
          <div className="mb-8">
            His films are drawn to people on the edge of a change, goodbyes,
            crossings, and the in-between, where emotion surfaces little by
            little instead of being explained.
          </div>
          <div className="mb-8">
            Over the past decade he has directed campaigns and branded films for
            Heineken, Grupo Modelo, Ford and BBVA, and the making-of for Apple’s
            ¡Suerte!, working in Spanish and English with agencies such as
            Wieden+Kennedy, Ogilvy, TBWA and DDB. His work has been recognized
            at Cannes Lions, El Ojo de Iberoamérica and The One Show, including
            Cerveza Indio’s The Mexican Dream, which he co-directed and led the
            B-unit on alongside Nono Ayuso, and Tecate’s Welcome back, paisano,
            where he directed the B-unit for Ariel Danziger.
          </div>
          <div className="mb-8">
            He recently shot his first narrative short film, now heading to
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
          <div>
            Selected Awards
          </div>
          <div className="pt-4">
            <div className="mb-4">
              2026 Cannes Lions. Gold, 2 Silver and Bronze: Tecate Welcome
              back, paisano (B-Unit Director)
            </div>
            <div className="mb-4">
              2026 Cannes Lions. Bronze in Film: Cerveza Indio The Mexican
              Dream (Co-director / B-Unit)
            </div>
            <div className="mb-4">
              2025 Cannes Lions Shortlist. Brand Experience &amp; Activation:
              Cerveza Indio Pay It Forward
            </div>
            <div className="mb-4">
              2025 El Ojo de Iberoamérica. Bronze in Creative Commerce: Cerveza
              Indio Pay It Forward
            </div>
            <div className="mb-4">
              2025 The One Show. Merit in Creative Use of Data: Cerveza Indio
              Pay It Forward
            </div>
            <div className="mb-4">
              2024 Círculo de Oro. 6 Gold, 4 Silver and 1 Bronze: Apple ¡Suerte!
              (Behind the Scenes Director)
            </div>
            <div className="mb-4">
              2024 Cannes Lions Shortlist. Data Visualisation: Embasa Line Guide
            </div>
            <div className="mb-4">
              2024 El Ojo de Iberoamérica. Bronze in Creative Commerce: Embasa
              Line Guide
            </div>
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

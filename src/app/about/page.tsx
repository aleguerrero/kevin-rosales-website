import Awards from "../Components/Awards";
import awards from "./awards.json";
import about from "./about.json";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="p-8 flex flex-row max-md:flex-col w-full items-center justify-center pt-24 fade-in-container">
      <div className="md:w-3/4">
        <div className="max-md:w-full w-1/2 flex flex-col font-thin text-lg">
          {about.about.map((a) => (
            <div className="mb-8">{a}</div>
          ))}
          <div className="font-bold">Brands</div>
          <div className="mb-8">{about.brands.join(", ")}</div>
          <div className="font-bold">Agencies</div>
          <div className="mb-8">{about.agencies.join(", ")}</div>
          <div className="mb-8">
            Let’s talk about life at{" "}
            <span className="font-medium">
              <a href={`mailto:${about.email}`}>{about.email}</a>
            </span>
          </div>
          <div className="font-bold">Selected Awards</div>
          <div className="pt-4">
            <Awards awards={awards} />
          </div>
          <div className="flex flex-row pt-4 ">
            <a
              href={about.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={`/instagramlogo.png`} className="w-[20px] mr-[10px]" />
            </a>
            <a
              href={about.vimeo}
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

import localFont from "next/font/local";

export type Award = {
  year: string;
  event: string;
  award: string;
  client: string;
  title: string;
  role: string;
};

const canelaFont = localFont({
  src: "/../../../public/Canela-Thin.otf",
});

const overusedFont = localFont({
  src: "/../../../public/OverusedGrotesk-SemiBold.otf",
});

export default function Awards({ awards }: { awards: Award[] }) {
  return (
    <div>
      {awards.map((a, i) => (
        <div key={i} className="mb-4 flex flex-row">
          <div className="text-sm mr-2 mt-1">{a.year}</div>
          <div>
            <div>
              <span className="font-bold">{a.event}</span>.{" "}
              <span className={`${canelaFont.className} text-md`}>
                {a.award}
              </span>
            </div>
            <div className="ml-5">
              {a.client} — <span className="font-bold">{a.title}</span>{" "}
              {a.role && `(${a.role})`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

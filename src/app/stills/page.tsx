import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import { CollageImage } from "./CollageImage";

export const metadata = {
  title: "Stills",
};

export default async function Stills() {
  const filePath = path.join(process.cwd(), "public", "images.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  const images = data.images;
//   const minImg = 300;
//   const maxImg = 700;

//   function randomSize() {
//     return Math.floor(Math.random() * 500);
//   }

  return (
    <div className="w-full flex flex-wrap flex-row justify-center p-8 pt-24 fade-in-container">
      {/* <div className='flex-1/4 p-4 max-md:flex-1/2 max-md:p-0'>
                {images.column1.map((image: string, index: number) => (
                    <img src={`/images/${image}`}
                        className='mt-2 max-md:pr-1 max-md:mt-1'
                        key={index}/>
                ))}
            </div>
            <div className='flex-1/4 p-4 max-md:flex-1/2 max-md:p-0'>
                {images.column2.map((image: string, index: number) => (
                    <img src={`/images/${image}`}
                        className='mt-2 max-md:pr-1 max-md:mt-1'
                        key={index}/>
                ))}
            </div>
            <div className='flex-1/4 p-4 max-md:flex-1/2 max-md:p-0'>
                {images.column3.map((image: string, index: number) => (
                    <img src={`/images/${image}`}
                        className='mt-2 max-md:pr-1 max-md:mt-1'
                        key={index}/>
                ))}
            </div>
            <div className='flex-1/4 p-4 max-md:flex-1/2 max-md:p-0'>
                {images.column4.map((image: string, index: number) => (
                    <img src={`/images/${image}`}
                        className='mt-2 max-md:pr-1 max-md:mt-1'
                        key={index}/>
                ))}
            </div> */}
      <div className="flex flex-row justify-center flex-wrap">
        {images.skies.map((image: string, i: number) => (
          <CollageImage src={`/fotos_web/${image}`} key={i} />
        ))}
      </div>
      <div className="flex flex-row justify-evenly flex-wrap">
        {images.people.map((image: string, i: number) => (
          <CollageImage src={`/fotos_web/${image}`} key={i} />
        ))}
      </div>
      <div className="flex flex-row justify-evenly flex-wrap">
        {images.arch.map((image: string, i: number) => (
          <CollageImage src={`/fotos_web/${image}`} key={i} />
        ))}
      </div>
    </div>
  );
}

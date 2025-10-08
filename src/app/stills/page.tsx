import { promises as fs } from 'fs';
import path from 'path'; 
import Image from 'next/image';

export default async function Stills() {
    const filePath = path.join(process.cwd(), 'public', 'images.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    const images = data.images;

    return (
        <div className='w-full flex flex-wrap p-2'>
            <div className='flex-1/4 p-4'>
                {images.column1.map((image: string, index: number) => (
                    <img src={`/images/${image}`}
                        className='mt-2'
                        key={index}/>
                ))}
            </div>
            <div className='flex-1/4 p-4'>
                {images.column2.map((image: string, index: number) => (
                    <img src={`/images/${image}`}
                        className='mt-2'
                        key={index}/>
                ))}
            </div>
            <div className='flex-1/4 p-4'>
                {images.column3.map((image: string, index: number) => (
                    <img src={`/images/${image}`}
                        className='mt-2'
                        key={index}/>
                ))}
            </div>
            <div className='flex-1/4 p-4'>
                {images.column4.map((image: string, index: number) => (
                    <img src={`/images/${image}`}
                        className='mt-2'
                        key={index}/>
                ))}
            </div>
        </div>
    )
}
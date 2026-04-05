"use client";

export function CollageImage({ src }: { src: string }) {
  const minImg = 300, maxImg = 700;
  const width = Math.floor(Math.random() * (maxImg - minImg + 1)) + minImg;
  const margin = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

  return (
    <img
      src={src}
      className="collage-img"
      style={{
        width: `${width}px`,
        maxHeight: "450px",
        maxWidth: "unset",
        height: "auto",
        objectFit: "contain",
        margin: `${margin}px`,
      }}
    />
  );
}
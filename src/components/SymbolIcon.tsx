"use client";

import Image from "next/image";

interface SymbolIconProps {
  svg: string;
  image?: string;
  size?: number;
  className?: string;
}

export default function SymbolIcon({ svg, image, size = 60, className = "" }: SymbolIconProps) {
  if (image) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`}>
        <Image
          src={image}
          alt=""
          width={size}
          height={size}
          className="object-contain"
          style={{ width: size, height: size }}
        />
      </span>
    );
  }

  const scaled = svg
    .replace(/width="40"/, `width="${size}"`)
    .replace(/height="40"/, `height="${size}"`);

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      dangerouslySetInnerHTML={{ __html: scaled }}
    />
  );
}
